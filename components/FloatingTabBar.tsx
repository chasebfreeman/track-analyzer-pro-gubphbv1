
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import { useTabTrigger } from 'expo-router/ui';

const { width: screenWidth } = Dimensions.get('window');

interface TabConfig {
  name: string;
  icon: string;
  label: string;
}

const TAB_CONFIGS: TabConfig[] = [
  { name: 'tracks', icon: 'map', label: 'Tracks' },
  { name: 'record', icon: 'add_circle', label: 'Record' },
  { name: 'browse', icon: 'search', label: 'Browse' },
];

interface FloatingTabBarProps {
  children: React.ReactElement[];
}

function TabButton({ name, icon, label }: TabConfig) {
  const theme = useTheme();
  const trigger = useTabTrigger({ name });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure the button is ready to receive touch events
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log(`Tab button ${name} is ready`);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [name]);

  const handlePress = () => {
    console.log(`Tab ${name} pressed, isFocused: ${trigger.isFocused}`);
    if (isReady && trigger.onPress) {
      trigger.onPress();
    }
  };

  const handleLongPress = () => {
    console.log(`Tab ${name} long pressed`);
    if (isReady && trigger.onLongPress) {
      trigger.onLongPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.tab,
        trigger.isFocused && {
          backgroundColor: theme.dark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.04)',
          borderRadius: 27,
        }
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.6}
      hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      disabled={!isReady}
    >
      <IconSymbol
        android_material_icon_name={icon}
        ios_icon_name={icon}
        size={24}
        color={trigger.isFocused ? theme.colors.primary : (theme.dark ? '#98989D' : '#000000')}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: theme.dark ? '#98989D' : '#8E8E93' },
          trigger.isFocused && { color: theme.colors.primary, fontWeight: '600' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FloatingTabBar({ children }: FloatingTabBarProps) {
  const theme = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('FloatingTabBar mounted');
    
    // Ensure the tab bar is fully initialized before accepting touches
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      console.log('FloatingTabBar initialized and ready for touches');
    }, 100);

    // Monitor app state to re-initialize if needed
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log('FloatingTabBar - AppState changed to:', nextAppState);
      if (nextAppState === 'active') {
        // Re-enable touch events when app becomes active
        setIsInitialized(true);
      }
    });

    return () => {
      clearTimeout(initTimer);
      subscription.remove();
    };
  }, []);

  const blurTint = theme.dark ? 'dark' : 'light';
  const backgroundColor = theme.dark
    ? 'rgba(28, 28, 30, 0.95)'
    : 'rgba(255, 255, 255, 0.95)';

  return (
    <>
      {children}
      <View 
        style={styles.outerContainer}
        pointerEvents="box-none"
      >
        <SafeAreaView 
          style={styles.safeArea} 
          edges={['bottom']}
          pointerEvents="box-none"
        >
          <View 
            style={[
              styles.container,
              {
                width: screenWidth / 2.5,
                marginBottom: 20
              }
            ]}
            pointerEvents={isInitialized ? "auto" : "none"}
          >
            <BlurView
              intensity={80}
              tint={blurTint}
              style={[
                styles.blurContainer,
                { 
                  borderRadius: 35,
                  backgroundColor,
                  borderWidth: 1.2,
                  borderColor: theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              ]}
            >
              <View style={styles.tabsContainer}>
                {TAB_CONFIGS.map((config, index) => (
                  <TabButton key={`${config.name}-${index}`} {...config} />
                ))}
              </View>
            </BlurView>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  safeArea: {
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  blurContainer: {
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
  },
});
