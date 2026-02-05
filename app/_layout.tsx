import { useAuthStore } from "@/store";
import { Stack } from "expo-router";
import "./globals.css";

export default function Layout() {
  const { session, isHydrated } = useAuthStore();
  
  if (!isHydrated) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {session ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
