
import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: 'tracks',
      route: '/(tabs)/tracks',
      icon: 'map',
      label: 'Tracks',
    },
    {
      name: 'record',
      route: '/(tabs)/record',
      icon: 'add_circle',
      label: 'Record',
    },
    {
      name: 'browse',
      route: '/(tabs)/browse',
      icon: 'search',
      label: 'Browse',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen 
          key="tracks" 
          name="tracks"
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          key="record" 
          name="record"
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          key="browse" 
          name="browse"
          options={{
            animation: 'none',
          }}
        />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
