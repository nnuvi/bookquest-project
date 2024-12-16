import * as React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { UserProvider } from './profile/getMe';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';

import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";


//const Stack = createNativeStackNavigator();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/*
// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,  // Useful when network is reconnected
      refetchOnMount: false,     // Avoids refetching each time the component mounts
      refetchOnWindowFocus: false, // Not relevant for React Native, so it’s safe to set to false
    },
  },
});*/

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
      <UserProvider>
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerBackTitle: 'Login', headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerBackTitle: 'SignUp', headerShown: false }} />
        <Stack.Screen name="profile/viewMyProfile" options={{ 
          headerBackTitle: 'Login', 
          headerTitle: 'My Profile',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
          },
          headerBackVisible: false,
          }} />
          <Stack.Screen name="profile/Homepage" options={{ headerShown: false }} />
          <Stack.Screen name="profile/MyProfile" options={{ headerShown: false }} />
          <Stack.Screen name="profile/Myborrowed" options={{ headerShown: false }} />
          <Stack.Screen name="profile/ProfileView" options={{ headerShown: false }} />
          <Stack.Screen name="profile/Search" options={{ headerShown: false }} />
          <Stack.Screen name="profile/Notifications" options={{ headerShown: false }} />
          <Stack.Screen name="profile/EditProfile" options={{ headerShown: false }} />
          <Stack.Screen name="profile/BookDetails" options={{ headerShown: false }} />
          <Stack.Screen name="profile/[bookId]" options={{ headerShown: false }} />
      </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}

