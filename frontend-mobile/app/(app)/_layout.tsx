import { Stack, Redirect } from "expo-router";
// import { useAuth } from "@/auth/AuthProvider";
import PageLoadingIndicator from "@/components/common/PageLoadingIndicator";

export default function AppLayout() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <PageLoadingIndicator />;
//   }

//   if (!user) {
//     return <Redirect href="/landing" />;
//   }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="books/[bookId]" />
      <Stack.Screen name="profile/[profileId]" />
    </Stack>
  );
}