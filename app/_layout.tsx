import "@/app/globals.css";
import { useAuthStore } from "@/store";
import { Stack } from "expo-router";

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
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
