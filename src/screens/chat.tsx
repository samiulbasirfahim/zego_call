import React, { useEffect } from 'react';
import {
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import type { ChatScreenProps } from '../navigation/types';
import { styles } from './styles';
import ZegoUIKitPrebuiltCallService, {
    ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

const APP_ID = 656904719;
const APP_SIGN =
    '6d1a82527eaf6450fe5294beb7d587cc7c4da211dab7dacab54645d1fb966c24';

export default function ChatScreen({ navigation, ...props }: ChatScreenProps) {
    const username = props.route.params.username;
    const [targetUsername, setTargetUsername] = React.useState('');

    ZegoUIKitPrebuiltCallService.init(
        APP_ID,
        APP_SIGN,
        `userid${username}`,
        `username${username}`,
        [ZIM, ZPNs],
        {
            ringtoneConfig: {
                incomingCallFileName: 'zego_incoming.mp3',
                outgoingCallFileName: 'zego_outgoing.mp3',
            },
            androidNotificationConfig: {
                channelID: 'CallInvitation',
                channelName: 'CallInvitation',
            },
        },
    )
        .then(() => {
            ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
                message:
                    'We need your consent for the following permissions in order to use the offline call function properly',
                allow: 'Allow',
                deny: 'Deny',
            });
        })
        .catch(e => {
            console.log('ZegoUIKitPrebuiltCallService init error: ', e);
        });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter target username"
                value={targetUsername}
                onChangeText={setTargetUsername}
            />
            <ZegoSendCallInvitationButton
                invitees={[
                    {
                        userID: `userid-${targetUsername}`,
                        userName: `username-${targetUsername}`,
                    },
                ]}
                isVideoCall={true}
                resourceID={'zego_call'}
            />
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
