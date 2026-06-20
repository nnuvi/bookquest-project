import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken } from '../../utils/secureStore'; // Your SecureStore utility
import api from '@/utils/api'; // Your API utility

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
          console.log("Starting auth check...");
          try {
            const res = await api.get('/auth/me');
            console.log("Auth check complete, status: ", res.status);
            if (res.status === 200) {
              console.log("Redirecting to home...");
              router.replace('/home/Homepage');
            } else {
              console.log("Redirecting to login...");
              router.replace('/');
            }
          } catch (error) {
            console.error("Error during auth check: ", error);
            router.replace('/');
          } finally {
            console.log("Auth check finished.");
            setIsChecking(false);
          }
        };
      
        checkAuth();
    }, [router]);
      
    if (isChecking) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;

