import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#09090b',
        letterSpacing: -0.3,
        marginBottom: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#09090b',
    },
    buttonText: {
        color: '#fafafa',
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#09090b',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
});

export default styles;
