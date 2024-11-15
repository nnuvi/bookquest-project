import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';

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
      </Stack>
    </ThemeProvider>
  );
}
