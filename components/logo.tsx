import React from 'react';
import { Image, View } from 'react-native';

interface LogoProps {
  size: number;
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <View 
      style={{ width: size, height: size }}
      className="overflow-hidden bg-orange-100 items-center justify-center"
    >
      <Image
        source={require('@/assets/images/logo.png')}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        resizeMode="cover"
      />
    </View>
  );
};