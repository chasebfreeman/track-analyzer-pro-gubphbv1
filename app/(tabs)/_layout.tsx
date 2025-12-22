
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import FloatingTabBar from '@/components/FloatingTabBar';

export default function TabLayout() {
  return (
    <Tabs>
      <View style={styles.container}>
        <TabSlot />
      </View>
      <TabList asChild>
        <FloatingTabBar>
          <TabTrigger name="tracks" href="/(tabs)/tracks" />
          <TabTrigger name="record" href="/(tabs)/record" />
          <TabTrigger name="browse" href="/(tabs)/browse" />
        </FloatingTabBar>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
