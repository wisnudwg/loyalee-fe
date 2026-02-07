import '@/app/globals.css';
import { Logo } from '@/components/logo';
import { TextInputError } from '@/components/textinput-error';
import { VariantButton } from '@/components/variant-button';
import { useAuthStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Screen() {
  const login = useAuthStore((state) => state.login);

  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login({ id: '1', name: 'Coffee Lover', email: data.email });
    router.push('/(main)/fetching-configurations');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="mb-10 items-center">
          <Logo size={100} />
          <Text className="text-3xl font-bold text-orange-900 mt-2">Loyalee</Text>
        </View>

        <View className="w-full flex flex-col gap-4">
          {/* Email Field */}
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`textinput ${errors.email ? 'error' : ''}`}
                />
              )}
            />
            {errors.email && (
              <TextInputError>{errors.email.message}</TextInputError>
            )}
          </View>

          {/* Password Field */}
          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  className={`textinput ${errors.password ? 'error' : ''}`}
                />
              )}
            />
            {errors.password && (
              <TextInputError>{errors.password.message}</TextInputError>
            )}
          </View>
        </View>

          <VariantButton
            variant="filled"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            loading={isSubmitting}
            className="mt-8 w-full"
          >
            Sign In
          </VariantButton>
          
          <TouchableOpacity onPress={() => router.push('/register')} className="mt-6">
            <Text className="text-gray-500">Don't have an account? <Text className="text-orange-900 font-bold">Register here!</Text></Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}