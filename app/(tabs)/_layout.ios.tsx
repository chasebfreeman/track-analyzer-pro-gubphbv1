
import React, { useEffect, useState } from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';
import { useColorScheme, Platform, AppState } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(AppState.currentState);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log('=== iOS Native Tabs Layout Mounted ===');
    console.log('Platform:', Platform.OS, Platform.Version);
    console.log('Color scheme:', colorScheme);
    console.log('App State:', appState);
    
    // Small delay to ensure tabs are fully initialized
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('Tabs ready for interaction');
    }, 100);
    
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('App state changed:', appState, '->', nextAppState);
      setAppState(nextAppState);
      
      // Re-initialize tabs when app becomes active
      if (nextAppState === 'active' && appState !== 'active') {
        console.log('App became active, re-initializing tabs');
        setIsReady(false);
        setTimeout(() => setIsReady(true), 50);
      }
    });
    
    return () => {
      console.log('=== iOS Native Tabs Layout Unmounted ===');
      subscription.remove();
      clearTimeout(timer);
    };
  }, [appState]);

  const isDark = colorScheme === 'dark';
  
  console.log('Rendering iOS Native Tabs with isDark:', isDark, 'isReady:', isReady);
  
  // Don't render tabs until ready
  if (!isReady) {
    return null;
  }
  
  return (
    <NativeTabs
      tintColor={colors.primary}
      iconColor={isDark ? '#98989D' : '#8E8E93'}
      labelStyle={{
        color: isDark ? '#98989D' : '#8E8E93',
      }}
      backgroundColor={isDark ? '#1C1C1E' : '#F2F2F7'}
      backBehavior="history"
    >
      <NativeTabs.Trigger 
        name="tracks"
        disablePopToTop={false}
        disableScrollToTop={false}
      >
        <Label>Tracks</Label>
        <Icon sf="map.fill" drawable="map" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger 
        name="record"
        disablePopToTop={false}
        disableScrollToTop={false}
      >
        <Label>Record</Label>
        <Icon sf="plus.circle.fill" drawable="add_circle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger 
        name="browse"
        disablePopToTop={false}
        disableScrollToTop={false}
      >
        <Label>Browse</Label>
        <Icon sf="magnifyingglass" drawable="search" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
