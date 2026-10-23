import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    ZegoUIKitPrebuiltCallInCallScreen: any;
    ZegoUIKitPrebuiltCallWaitingScreen: any;
};

export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;
