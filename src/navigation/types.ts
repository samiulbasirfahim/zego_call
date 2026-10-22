import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Chat: {
        username: string;
    };
    ZegoUIKitPrebuiltCallInCallScreen: any;
    ZegoUIKitPrebuiltCallWaitingScreen: any;
};

export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;
export type ChatScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'Chat'
>;
