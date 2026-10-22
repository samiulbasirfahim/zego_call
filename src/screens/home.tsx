import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { HomeScreenProps } from '../navigation/types';
import { styles } from './styles';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Chat')}
      >
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
