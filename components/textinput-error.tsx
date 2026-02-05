import { Text, TextProps } from "react-native";

export const TextInputError = ({ children, className, ...props }: TextProps) => {
  return (
    <Text className={`text-red-500 text-sm mt-1 ml-1 ${className}`} {...props}>{children}</Text>
  )
}