import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { HomeScreenProps } from '../navigation/types';
import { styles } from './styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [username, setUsername] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() =>
                    navigation.navigate('Chat', {
                        username,
                    })
                }
            >
                <Text style={styles.buttonText}>Go to Chat</Text>
            </TouchableOpacity>
        </View>
    );
}
