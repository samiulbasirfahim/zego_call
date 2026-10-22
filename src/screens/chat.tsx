import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { ChatScreenProps } from '../navigation/types';
import { styles } from './styles';

export default function ChatScreen({ navigation }: ChatScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
