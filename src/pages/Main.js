import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';
import like from '../assets/like.png';
import logo from '../assets/logo.png';
import Load from '../components/Load';
import api from '../services/api';
import styles from './MainStyles';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const response = await api.get('/devs', {
                    headers: {
                        user: id
                    }
                });

                setUsers(response.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        })();

    }, [id]);

    useEffect(() => {
        // const socket = io('http://192.168.1.101:3333', {
        const socket = io('https://tindev-app-backend.herokuapp.com', {
            query: { user: id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        });

    }, [id]);

    async function handleDislike() {
        try {
            setLoading(true);

            if (users.length > 0) {
                const [user, ...rest] = users;

                await api.post(`/devs/${user._id}/dislikes`, null, {
                    headers: {
                        user: id
                    }
                });

                setUsers(rest);

                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    }

    async function handleLike() {
        try {
            setLoading(true);

            if (users.length > 0) {
                const [user, ...rest] = users;

                await api.post(`/devs/${user._id}/likes`, null, {
                    headers: {
                        user: id
                    }
                });

                setUsers(rest);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            setLoading(true);
            await AsyncStorage.clear();

            setLoading(false);

            navigation.navigate('Login');
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Load loading={loading} />

            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                {users.length > 0 ? (users.map((user, index) => (
                    <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                        <Image style={styles.avatar} source={{ uri: user.avatar }} />
                        <View style={styles.footer}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                        </View>
                    </View>
                ))) : !loading && (
                    <Text style={styles.empty}>Acabou :(</Text>
                )}
            </View>

            {users.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} />
                    </TouchableOpacity>
                </View>
            )}

            {matchDev && (
                <View style={styles.matchContainer}>
                    <Image style={styles.matchImage} source={itsamatch} />
                    <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    <TouchableOpacity onPress={() => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}