
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme, Platform, View, Text, ActivityIndicator } from 'react-native';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { colors } from '@/styles/commonStyles';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [initTimeout, setInitTimeout] = useState(false);

  useEffect(() => {
    console.log('RootLayout: Component mounted, Platform:', Platform.OS);
    
    // Set a timeout to force initialization after 3 seconds
    const timeout = setTimeout(() => {
      console.log('RootLayout: Initialization timeout reached, forcing app to load');
      setInitTimeout(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log('RootLayout: Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync().catch((err) => {
        console.error('RootLayout: Error hiding splash screen:', err);
      });
    }
  }, [loaded]);

  // Show loading screen with timeout
  if (!loaded && !initTimeout) {
    console.log('RootLayout: Waiting for fonts to load');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, fontSize: 16, color: colors.textSecondary }}>
          Initializing app...
        </Text>
      </View>
    );
  }

  // Force render even if fonts aren't loaded after timeout
  if (initTimeout && !loaded) {
    console.log('RootLayout: Timeout reached, rendering without custom fonts');
  }

  console.log('RootLayout: Rendering app');

  return (
    <SupabaseAuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="modal" 
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Modal',
            }}
          />
          <Stack.Screen 
            name="formsheet" 
            options={{
              presentation: 'formSheet',
              headerShown: true,
              title: 'Form Sheet',
            }}
          />
          <Stack.Screen 
            name="transparent-modal" 
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SupabaseAuthProvider>
  );
}
