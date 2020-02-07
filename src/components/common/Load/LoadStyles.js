import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loadingStyle: {
        ...StyleSheet.absoluteFillObject,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        elevation: 4
    }
});