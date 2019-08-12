import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

export default function Load(props) {
    useEffect(() => {
        console.log(props);

    }, []);

    return props.loading && (
        <SafeAreaView style={styles.loadingStyle}>
            <ActivityIndicator
                size={props.size || "large"}
                color={props.color || "#df4723"}
                animating={props.loading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 100
    }
});