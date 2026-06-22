import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import PageLoadingIndicator from "@/components/common/PageLoadingIndicator";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/(app)/(tabs)/Homepage");
    } else {
      router.replace("/(auth)/landing");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <PageLoadingIndicator />
      </View>
    );
  }

  return null;
}
