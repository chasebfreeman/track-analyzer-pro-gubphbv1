
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_KEY = '@app_pin';
const PIN_SETUP_KEY = '@pin_setup';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPinSetup, setIsPinSetup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...');
      const pinSetup = await AsyncStorage.getItem(PIN_SETUP_KEY);
      const sessionAuth = await AsyncStorage.getItem('@session_authenticated');
      
      console.log('PIN setup:', pinSetup, 'Session auth:', sessionAuth);
      
      setIsPinSetup(pinSetup === 'true');
      setIsAuthenticated(sessionAuth === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // If PIN not setup, go to setup
  if (!isPinSetup) {
    console.log('PIN not setup, redirecting to setup-pin');
    return <Redirect href="/auth/setup-pin" />;
  }

  // If authenticated, go to app
  if (isAuthenticated) {
    console.log('Authenticated, redirecting to tracks');
    return <Redirect href="/(tabs)/tracks" />;
  }

  // Otherwise, go to PIN entry
  console.log('Not authenticated, redirecting to enter-pin');
  return <Redirect href="/auth/enter-pin" />;
}
