// app/(main)/_layout.tsx
import { Stack } from 'expo-router';
// import { useQueryClient } from '@tanstack/react-query';

export default function MainLayout() {
  // const queryClient = useQueryClient();
  
  // Check if we already have the user in the TanStack cache
  // const hasUserData = queryClient.getQueryData(['user-me']);

  // If the user just opened the app and we already have their data cached,
  // we can skip the fetching-config screen and go straight to tabs.
  // Otherwise, the root logic will default to the first screen in the group.

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="fetching-configurations" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}