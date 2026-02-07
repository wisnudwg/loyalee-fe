import { useAuthStore } from "@/store";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Screen() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}