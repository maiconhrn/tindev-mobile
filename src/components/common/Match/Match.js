import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import itsamatch from '../../../assets/itsamatch.png';
import styles from './MatchStyles';

export default function Match({ matchDev, setMatchDev }) {
    return (
        <>
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
        </>
    );
}
