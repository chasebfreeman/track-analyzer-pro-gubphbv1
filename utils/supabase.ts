
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Supabase configuration
const SUPABASE_URL = 'https://fdgnmcaxiclsqlydftpq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZ25tY2F4aWNsc3FseWRmdHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDY2MjIsImV4cCI6MjA4MjA4MjYyMn0.uDqknuhqE31APx3wv-L7Wm6dcfafdO5GI5KLC2DOFnE';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  const configured = SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
  console.log('Supabase configured:', configured);
  return configured;
};

// Create a safe storage adapter that handles missing window object
const createSafeStorageAdapter = () => {
  // In-memory fallback storage
  const memoryStorage: { [key: string]: string } = {};

  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        // Only use AsyncStorage on native platforms
        if (Platform.OS !== 'web') {
          return await AsyncStorage.getItem(key);
        }
        // For web, return from memory storage (will be handled by web-specific file)
        return memoryStorage[key] || null;
      } catch (error) {
        console.error('Error getting item from storage:', error);
        return memoryStorage[key] || null;
      }
    },
    setItem: async (key: string, value: string): Promise<void> => {
      try {
        if (Platform.OS !== 'web') {
          await AsyncStorage.setItem(key, value);
        }
        memoryStorage[key] = value;
      } catch (error) {
        console.error('Error setting item in storage:', error);
        memoryStorage[key] = value;
      }
    },
    removeItem: async (key: string): Promise<void> => {
      try {
        if (Platform.OS !== 'web') {
          await AsyncStorage.removeItem(key);
        }
        delete memoryStorage[key];
      } catch (error) {
        console.error('Error removing item from storage:', error);
        delete memoryStorage[key];
      }
    },
  };
};

// Create Supabase client with safe storage adapter
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: createSafeStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

console.log('Supabase client initialized (native)');
