import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  getMessaging,
  onRegistered,
  register,
  requestPermission,
} from '@react-native-firebase/messaging';

export const useFCM = () => {
  useEffect(() => {
    const messaging = getMessaging();

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = onRegistered(messaging, (token) => {
        console.log('FCM Token:', token);
      });
    } catch (error) {
      console.error('Error subscribing to FCM registration:', error);
    }

    const setupFCM = async () => {
      try {
        if (Platform.OS === 'ios') {
          await requestPermission(messaging);
        } else if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        }

        await register(messaging);
      } catch (error) {
        console.error('Error registering FCM:', error);
      }
    };

    setupFCM();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
};

export default useFCM;
