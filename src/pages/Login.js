import AsyncStorage from '@react-native-community/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import Load from '../components/Load';
import api from '../services/api';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const user = await AsyncStorage.getItem('user');

                setLoading(false);

                if (user) {
                    navigation.navigate('Main', { user });
                }
            } catch (e) {
                setLoading(false);
            }
        })();
    }, [navigation]);

    async function handleLogin() {
        try {
            setLoading(true);

            const response = await api.post('/devs', {
                username: user
            });

            const { _id } = response.data;

            await AsyncStorage.setItem('user', _id);

            setLoading(false);

            navigation.navigate('Main', { user: _id });
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}>

            <Load loading={loading} />

            <Image source={logo} />

            <TextInput autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário do GitHub"
                style={styles.input}
                placeholderTextColor="#df4723"
                value={user}
                onChangeText={setUser} />

            <TouchableOpacity style={styles.button}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#df4723',
        color: '#df4723',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});