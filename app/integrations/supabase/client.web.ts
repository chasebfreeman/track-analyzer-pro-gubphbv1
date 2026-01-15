
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fdgnmcaxiclsqlydftpq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZ25tY2F4aWNsc3FseWRmdHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDY2MjIsImV4cCI6MjA4MjA4MjYyMn0.uDqknuhqE31APx3wv-L7Wm6dcfafdO5GI5KLC2DOFnE";

// Simple localStorage wrapper with error handling and fallback
const createStorageAdapter = () => {
  // In-memory fallback storage
  const memoryStorage: { [key: string]: string } = {};
  let hasLocalStorage = false;

  // Check if localStorage is available (synchronously)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__supabase_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      hasLocalStorage = true;
      console.log('localStorage: available and working');
    }
  } catch (error) {
    console.warn('localStorage not available, using memory storage:', error);
    hasLocalStorage = false;
  }

  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        if (hasLocalStorage) {
          return window.localStorage.getItem(key);
        }
        return memoryStorage[key] || null;
      } catch (error) {
        console.error('Error getting item from storage:', error);
        return memoryStorage[key] || null;
      }
    },
    setItem: async (key: string, value: string): Promise<void> => {
      try {
        if (hasLocalStorage) {
          window.localStorage.setItem(key, value);
        }
        memoryStorage[key] = value;
      } catch (error) {
        console.error('Error setting item in storage:', error);
        memoryStorage[key] = value;
      }
    },
    removeItem: async (key: string): Promise<void> => {
      try {
        if (hasLocalStorage) {
          window.localStorage.removeItem(key);
        }
        delete memoryStorage[key];
      } catch (error) {
        console.error('Error removing item from storage:', error);
        delete memoryStorage[key];
      }
    },
  };
};

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});

console.log('Supabase client initialized from integrations/supabase/client (web)');
