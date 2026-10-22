import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../screens/home';
import ChatScreen from '../screens/chat';
import type { RootStackParamList } from './types';
import {
    ZegoCallInvitationDialog,
    ZegoUIKitPrebuiltCallInCallScreen,
    ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export * from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <ZegoCallInvitationDialog />
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerShadowVisible: false,
                        headerStyle: { backgroundColor: '#ffffff' },
                        headerTitleStyle: {
                            fontSize: 17,
                            fontWeight: '600',
                            color: '#09090b',
                        },
                        contentStyle: { backgroundColor: '#ffffff' },
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="ZegoUIKitPrebuiltCallWaitingScreen"
                        component={ZegoUIKitPrebuiltCallWaitingScreen}
                    />
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="ZegoUIKitPrebuiltCallInCallScreen"
                        component={ZegoUIKitPrebuiltCallInCallScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
