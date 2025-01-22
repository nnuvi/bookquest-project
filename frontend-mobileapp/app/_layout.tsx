import * as React from 'react';
import { View, Text } from 'react-native';
import { 
  DarkTheme,
  DefaultTheme, 
  ThemeProvider, 
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot, Stack, Tabs, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { UserProvider } from './profile/getMe';
import { useColorScheme } from '@/hooks/useColorScheme';
import { 
  QueryClient, 
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import api from '@/utils/api';
import AuthWrapper from '@/components/middleware/AuthWrapper';
import PageLoadingIndicator from '@/components/common/PageLoadingIndicator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const prefetchAuthUser = async () => {
      try {
        console.log('for cashe');
        const res = await api('/auth/me');
        const data = await res.data;
        if (data) {
          queryClient.setQueryData(['authUser'], data);
        }
      } catch (error) {
        console.error(error);
        router.push('/');
      }
    };
    prefetchAuthUser();
  }, [queryClient]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerBackTitle: 'Login', headerShown: false }} />
            <Stack.Screen name="auth/signup" options={{ headerBackTitle: 'SignUp', headerShown: false }} /> 
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile/viewMyProfile" options={{ 
            headerBackTitle: 'Login', 
            headerTitle: 'My Profile',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
            },
            headerBackVisible: false,
            }} />
            <Stack.Screen name="profile/Myborrowed" options={{ headerShown: false }} />
            <Stack.Screen name="search/Search" options={{ headerShown: false }} />
            <Stack.Screen name="profile/ProfileView/[profileId]" options={{ headerShown: false }} />
            <Stack.Screen name="notifications/Notifications" options={{ headerShown: false }} />
            <Stack.Screen name="profile/EditProfile" options={{ headerShown: false }} />
            <Stack.Screen name="profile/BookDetails" options={{ headerShown: false }} /> 
            <Stack.Screen name="books/bookDetails/[bookId]" options={{ headerShown: false }} /> 
          </Stack> 
      </QueryClientProvider>
    </ThemeProvider>
  );
}