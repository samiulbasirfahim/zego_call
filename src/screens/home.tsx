import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
    ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { HomeScreenProps } from '../navigation/types';
import { onUserLogin } from '../common';
import KeyCenter from '../KeyCenter';
import { styles } from './styles';

const RESOURCE_ID = 'zego_call_v2';
const PRESET_USERS = ['user_1', 'user_2', 'alice', 'bob'];

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [targetUserInput, setTargetUserInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Parse comma-separated or single invitees matching official example pattern
    const parsedInvitees = targetUserInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
        .map(id => ({
            userID: id,
            userName: 'user_' + id,
        }));

    // Load saved user info on mount if available
    useEffect(() => {
        const loadSavedUser = async () => {
            try {
                const savedId = await EncryptedStorage.getItem('zego_saved_user_id');
                const savedName = await EncryptedStorage.getItem(
                    'zego_saved_user_name',
                );
                if (savedId) {
                    setUserID(savedId);
                    setUserName(savedName || savedId);
                }
            } catch (err) {
                console.log('EncryptedStorage load error:', err);
            }
        };
        loadSavedUser();
    }, []);

    const showFeedback = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('', message);
        }
    };

    const handleLogin = async () => {
        const cleanUserID = userID.trim();
        const cleanUserName = userName.trim() || cleanUserID;

        if (!cleanUserID) {
            Alert.alert('Required Field', 'Please enter a User ID to log in.');
            return;
        }

        setIsLoading(true);

        try {
            // Request Android 13+ Notification permission if applicable
            if (Platform.OS === 'android' && Platform.Version >= 33) {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    );
                } catch (permError) {
                    console.log('Notification permission request error:', permError);
                }
            }

            // Initialize Zego call service using official onUserLogin implementation
            await onUserLogin(cleanUserID, cleanUserName, navigation);

            // Save user credentials for persistence
            try {
                await EncryptedStorage.setItem('zego_saved_user_id', cleanUserID);
                await EncryptedStorage.setItem('zego_saved_user_name', cleanUserName);
            } catch (storageErr) {
                console.log('EncryptedStorage save error:', storageErr);
            }

            setIsLoggedIn(true);
            showFeedback(`Connected as ${cleanUserName}`);
        } catch (error) {
            console.error('Zego init error:', error);
            Alert.alert(
                'Initialization Error',
                'Failed to initialize Zego Call service. Please check your network and credentials.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to uninitialize Zego Call service and log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        try {
                            // Uninitialize ZegoUIKitPrebuiltCallService
                            ZegoUIKitPrebuiltCallService.uninit();
                            setIsLoggedIn(false);
                            setTargetUserInput('');
                            showFeedback('Logged out and uninitialized successfully');
                        } catch (err) {
                            console.error('Zego uninit error:', err);
                            Alert.alert('Error', 'Failed to uninitialize service.');
                        }
                    },
                },
            ],
        );
    };

    const validateCall = (): boolean => {
        if (parsedInvitees.length === 0) {
            Alert.alert(
                'Target Required',
                'Please enter at least one recipient User ID to call.',
            );
            return false;
        }
        if (parsedInvitees.some(inv => inv.userID === userID.trim())) {
            Alert.alert(
                'Invalid Target',
                'You cannot place a call to your own User ID.',
            );
            return false;
        }
        return true;
    };

    const handleCallPressed = (
        errorCode: number,
        errorMessage: string,
        errorInvitees?: any,
    ) => {
        if (errorCode === 0) {
            console.log('Call invitation sent successfully');
        } else {
            console.warn(
                'Call invitation failed:',
                errorCode,
                errorMessage,
                errorInvitees,
            );
            if (parsedInvitees.length === 0) {
                Alert.alert(
                    'Target Required',
                    'Please enter a recipient User ID before placing a call.',
                );
            } else {
                Alert.alert(
                    'Call Error',
                    `Error (${errorCode}): ${errorMessage || 'Failed to place call'}`,
                );
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Branding */}
                    <View style={styles.headerContainer}>
                        <View style={styles.brandRow}>
                            <Text style={styles.title}>Zego Cloud Call</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>UIKit Demo</Text>
                            </View>
                        </View>
                        <Text style={styles.subtitle}>
                            1-on-1 & Group Voice & Video Call with Offline Push Notifications
                        </Text>
                    </View>

                    {/* Status Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Connection Status</Text>
                            <View
                                style={[
                                    styles.statusBadge,
                                    isLoggedIn
                                        ? styles.statusBadgeOnline
                                        : styles.statusBadgeOffline,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.statusDot,
                                        isLoggedIn
                                            ? styles.statusDotOnline
                                            : styles.statusDotOffline,
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.statusText,
                                        isLoggedIn
                                            ? styles.statusTextOnline
                                            : styles.statusTextOffline,
                                    ]}
                                >
                                    {isLoggedIn ? 'Online & Ready' : 'Uninitialized'}
                                </Text>
                            </View>
                        </View>

                        {isLoggedIn ? (
                            <View style={styles.userProfileRow}>
                                <View style={styles.avatarAndInfo}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>
                                            {(userName || userID || 'U').charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.userNameText}>
                                            {userName || userID}
                                        </Text>
                                        <Text style={styles.userIdText}>User ID: {userID}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.logoutButton}
                                    activeOpacity={0.7}
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.logoutButtonText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={styles.subtitle}>
                                Log in below to initialize the call service and listen for
                                offline & online incoming calls.
                            </Text>
                        )}
                    </View>

                    {/* Login Form (Shown when Logged Out) */}
                    {!isLoggedIn ? (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Login / Initialize Service</Text>
                            <Text style={styles.cardSubtitle}>
                                Register with Zego Cloud using AppID: {KeyCenter.appID}
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Your User ID *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. user_1 or user_2"
                                    placeholderTextColor="#94a3b8"
                                    value={userID}
                                    onChangeText={setUserID}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!isLoading}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>
                                    Your Display Name (Optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. John Doe"
                                    placeholderTextColor="#94a3b8"
                                    value={userName}
                                    onChangeText={setUserName}
                                    autoCapitalize="words"
                                    editable={!isLoading}
                                />
                            </View>

                            {/* Preset Quick Chips */}
                            <View style={styles.presetsRow}>
                                <Text style={styles.presetLabel}>Quick Presets:</Text>
                                {PRESET_USERS.map(preset => (
                                    <TouchableOpacity
                                        key={preset}
                                        style={styles.presetChip}
                                        onPress={() => {
                                            setUserID(preset);
                                            setUserName(preset);
                                        }}
                                        disabled={isLoading}
                                    >
                                        <Text style={styles.presetChipText}>{preset}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    isLoading && styles.primaryButtonDisabled,
                                ]}
                                activeOpacity={0.8}
                                onPress={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#ffffff" size="small" />
                                ) : (
                                    <Text style={styles.primaryButtonText}>
                                        Login & Initialize Call Service
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        /* Call Functionality (Shown when Logged In) */
                        <View style={styles.card}>
                            <Text style={styles.callSectionTitle}>Place a Call</Text>
                            <Text style={styles.callSectionSubtitle}>
                                Enter invitee ID(s), separate multiple IDs by comma
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Invitees ID *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. user_2 (or user_2, user_3 for group)"
                                    placeholderTextColor="#94a3b8"
                                    value={targetUserInput}
                                    onChangeText={setTargetUserInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            {/* Quick target chips excluding current user */}
                            <View style={styles.presetsRow}>
                                <Text style={styles.presetLabel}>Quick Targets:</Text>
                                {PRESET_USERS.filter(preset => preset !== userID.trim()).map(
                                    preset => (
                                        <TouchableOpacity
                                            key={preset}
                                            style={styles.presetChip}
                                            onPress={() => setTargetUserInput(preset)}
                                        >
                                            <Text style={styles.presetChipText}>{preset}</Text>
                                        </TouchableOpacity>
                                    ),
                                )}
                            </View>

                            <View style={styles.callButtonsRow}>
                                <View style={styles.callButtonWrapper}>
                                    <ZegoSendCallInvitationButton
                                        invitees={parsedInvitees}
                                        isVideoCall={false}
                                        resourceID={RESOURCE_ID}
                                        showWaitingPageWhenGroupCall={true}
                                        text="Voice Call"
                                        width={140}
                                        height={48}
                                        backgroundColor="#16a34a"
                                        borderRadius={12}
                                        textColor="#ffffff"
                                        fontSize={14}
                                        verticalLayout={false}
                                        onWillPressed={validateCall}
                                        onPressed={handleCallPressed}
                                    />
                                    <Text style={styles.callButtonLabel}>Audio Only</Text>
                                </View>

                                <View style={styles.callButtonWrapper}>
                                    <ZegoSendCallInvitationButton
                                        invitees={parsedInvitees}
                                        isVideoCall={true}
                                        resourceID={RESOURCE_ID}
                                        showWaitingPageWhenGroupCall={true}
                                        text="Video Call"
                                        width={140}
                                        height={48}
                                        backgroundColor="#2563eb"
                                        borderRadius={12}
                                        textColor="#ffffff"
                                        fontSize={14}
                                        verticalLayout={false}
                                        onWillPressed={validateCall}
                                        onPressed={handleCallPressed}
                                    />
                                    <Text style={styles.callButtonLabel}>Audio + Video</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* How to Test Offline Calling Guide */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>
                            📱 Testing Offline Call Invitations
                        </Text>
                        <Text style={styles.infoText}>
                            1. Install and run this app on two devices (or emulators).{'\n'}
                            2. On Device 1, login as{' '}
                            <Text style={styles.boldText}>user_1</Text>.{'\n'}
                            3. On Device 2, login as{' '}
                            <Text style={styles.boldText}>user_2</Text>, then{' '}
                            <Text style={styles.boldText}>
                                lock the screen or kill the app
                            </Text>
                            .{'\n'}
                            4. From Device 1, enter{' '}
                            <Text style={styles.boldText}>user_2</Text> and place a call.
                            {'\n'}
                            5. Device 2 will ring with a full-screen notification or
                            lock-screen call UI!
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
