
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = screenWidth / 2.5,
  borderRadius = 35,
  bottomMargin
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  // Simplified active tab detection
  const activeTabIndex = React.useMemo(() => {
    const index = tabs.findIndex(tab => {
      const routeStr = tab.route as string;
      return pathname === routeStr || pathname.includes(tab.name);
    });
    console.log('FloatingTabBar: Active tab index:', index, 'for pathname:', pathname);
    return index >= 0 ? index : 0;
  }, [pathname, tabs]);

  const handleTabPress = React.useCallback((route: Href, tabName: string) => {
    console.log('FloatingTabBar: Tab pressed:', tabName, 'Route:', route);
    try {
      router.push(route);
    } catch (error) {
      console.error('FloatingTabBar: Navigation error:', error);
    }
  }, [router]);

  // Dynamic styles based on theme
  const blurTint = theme.dark ? 'dark' : 'light';
  const backgroundColor = theme.dark
    ? 'rgba(28, 28, 30, 0.95)'
    : 'rgba(255, 255, 255, 0.95)';

  return (
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
              width: containerWidth,
              marginBottom: bottomMargin ?? 20
            }
          ]}
          pointerEvents="auto"
        >
          <BlurView
            intensity={80}
            tint={blurTint}
            style={[
              styles.blurContainer,
              { 
                borderRadius,
                backgroundColor,
                borderWidth: 1.2,
                borderColor: theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            ]}
          >
            <View style={styles.tabsContainer}>
              {tabs.map((tab, index) => {
                const isActive = activeTabIndex === index;

                return (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        isActive && {
                          backgroundColor: theme.dark
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.04)',
                          borderRadius: 27,
                        }
                      ]}
                      onPress={() => handleTabPress(tab.route, tab.name)}
                      activeOpacity={0.6}
                      hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
                    >
                      <IconSymbol
                        android_material_icon_name={tab.icon}
                        ios_icon_name={tab.icon}
                        size={24}
                        color={isActive ? theme.colors.primary : (theme.dark ? '#98989D' : '#000000')}
                      />
                      <Text
                        style={[
                          styles.tabLabel,
                          { color: theme.dark ? '#98989D' : '#8E8E93' },
                          isActive && { color: theme.colors.primary, fontWeight: '600' },
                        ]}
                      >
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  </React.Fragment>
                );
              })}
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
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
