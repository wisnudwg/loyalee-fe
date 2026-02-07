import { Logo } from "@/components/logo";
import { COLORS } from "@/utils";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Screen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Logo size={100} />
      <View className="mt-8 items-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text className="text-orange-800 font-medium mt-4">
          Setting up your rewards...
        </Text>
        <Text className="text-gray-400 text-sm">Synchronizing Loyalee data</Text>
        <TouchableOpacity
          onPress={() => router.push('/(main)/(tabs)/home')}
          className="mt-4 bg-orange-800 p-2 rounded-md"
        >
          <Text className="text-white">Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}