import { useMemo } from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ButtonProps = Omit<TouchableOpacityProps, 'children'> & {
  children: React.ReactNode;
  loading?: boolean;
  // size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline';
};

export const Button = ({ children, className, disabled, loading, variant, ...props }: ButtonProps) => {
  const classNameByVariantTouchableOpacity = useMemo(() => {
    switch (variant) {
      case 'outline':
        return 'border border-orange-800';
      default:
        return 'bg-orange-800';
    }
  }, [variant]);

  const classNameByVariantText = useMemo(() => {
    switch (variant) {
      case 'outline':
        return 'text-orange-800';
      default:
        return 'text-white';
    }
  }, [variant]);

  const loaderColorByVariant = useMemo(() => {
    switch (variant) {
      case 'outline':
        return 'black';
      default:
        return 'white';
    }
  }, [variant]);

  const opacity = useMemo(() => {
    if (disabled || loading) return 'opacity-50';
    return 'opacity-100';
  }, [disabled, loading])

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      className={`w-full h-14 rounded-xl justify-center items-center ${opacity} ${classNameByVariantTouchableOpacity} ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColorByVariant} />
      ) : (
        <Text className={`${classNameByVariantText} font-bold text-lg`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
