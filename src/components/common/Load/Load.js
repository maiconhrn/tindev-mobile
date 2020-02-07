import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import styles from './LoadStyles';

export default function Load(props) {
    return (
        <>
            {props.loading && (
                <SafeAreaView style={styles.loadingStyle}>
                    <ActivityIndicator
                        size={props.size || "large"}
                        color={props.color || "#df4723"}
                        animating={props.loading}
                    />
                </SafeAreaView>
            )}
        </>);
}
