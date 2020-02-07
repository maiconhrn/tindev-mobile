import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    matchContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 3
    },
    matchAvatar: {
        backgroundColor: '#fff',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30
    },
    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },
    matchImage: {
        height: 60,
        resizeMode: 'contain'
    },
    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    closeMatch: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }
});