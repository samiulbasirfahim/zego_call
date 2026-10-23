import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { ZegoLayoutMode } from '@zegocloud/zego-uikit-rn';
import ZegoUIKitPrebuiltCallService, {
    ZegoInvitationType,
    ZegoMenuBarButtonName,
    ZegoMultiCertificate,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from './KeyCenter';

const styles = StyleSheet.create({
    avatarContainer: {
        width: '100%',
        height: '100%',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
});

export const onUserLogin = async (
    userID: string,
    userName: string,
    navigation?: any,
) => {
    return ZegoUIKitPrebuiltCallService.init(
        KeyCenter.appID,
        KeyCenter.appSign,
        userID,
        userName,
        [ZIM, ZPNs],
        {
            ringtoneConfig: {
                incomingCallFileName: 'zego_incoming.mp3',
                outgoingCallFileName: 'zego_outgoing.mp3',
            },
            certificateIndex: ZegoMultiCertificate.first,
            androidNotificationConfig: {
                channelID: 'ZegoUIKit',
                channelName: 'ZegoUIKit',
            },
            avatarBuilder: ({ userInfo }: { userInfo: { userID: string; userName: string } }) => {
                return (
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatarImage}
                            resizeMode="cover"
                            source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
                        />
                    </View>
                );
            },
            requireInviterConfig: {
                enabled: false,
                detectSeconds: 5,
            },
            showDeclineButton: true,
            requireConfig: (callInvitationData: any) => {
                console.log('requireConfig, callID: ', callInvitationData.callID);
                return {
                    turnOnMicrophoneWhenJoining: true,
                    turnOnCameraWhenJoining:
                        callInvitationData.type === ZegoInvitationType.videoCall,
                    layout: {
                        mode:
                            callInvitationData.invitees &&
                            callInvitationData.invitees.length > 1
                                ? ZegoLayoutMode.gallery
                                : ZegoLayoutMode.pictureInPicture,
                        config: {
                            removeViewWhenAudioVideoUnavailable: false,
                        },
                    },
                    onCallEnd: (callID: string, reason: string, duration: number) => {
                        console.log('CallWithInvitation onCallEnd', callID, reason, duration);
                        if (navigation) {
                            if (typeof navigation.popTo === 'function') {
                                navigation.popTo('Home');
                            } else {
                                navigation.navigate('Home');
                            }
                        }
                    },
                    timingConfig: {
                        isDurationVisible: true,
                        onDurationUpdate: (duration: number) => {
                            if (duration === 10 * 60) {
                                ZegoUIKitPrebuiltCallService.hangUp();
                            }
                        },
                    },
                    topMenuBarConfig: {
                        buttons: [ZegoMenuBarButtonName.minimizingButton],
                    },
                    onWindowMinimized: () => {
                        console.log('CallInvitation onWindowMinimized');
                        if (navigation) {
                            if (typeof navigation.popTo === 'function') {
                                navigation.popTo('Home');
                            } else {
                                navigation.navigate('Home');
                            }
                        }
                    },
                    onWindowMaximized: () => {
                        console.log('CallInvitation onWindowMaximized');
                        if (navigation) {
                            navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
                        }
                    },
                };
            },
        },
    ).then(() => {
        // Request system alert window for offline/background call popup
        ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
            message:
                'We need your consent for the following permissions in order to use the offline call function properly',
            allow: 'Allow',
            deny: 'Deny',
        });

        // Request full intent permission for displaying incoming calls on lock screen
        ZegoUIKitPrebuiltCallService.requestFullIntentPermission({
            message:
                'To display incoming call notifications on the lock screen, we need the "Display full-screen notifications" permission. Please allow it so you never miss a call.',
            allow: 'Allow',
            deny: 'Deny',
        });
    });
};
