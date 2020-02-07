import AsyncStorage from '@react-native-community/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.png';
import api from '../../../services/api';
import Load from '../../common/Load/Load';
import styles from './LoginStyles';

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
