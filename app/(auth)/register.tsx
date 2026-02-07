import { Logo } from '@/components/logo';
import { TextInputError } from '@/components/textinput-error';
import { VariantButton } from '@/components/variant-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';

// 1. Validation Schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"], // Error will attach to this field
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Screen() {
  const router = useRouter();
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Registered with:', data.email);
    
    // Redirect back to Login
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" className="px-6">
        <View className="flex-1 justify-center items-center py-10">
          <Logo size={80} />
          <Text className="text-3xl font-bold text-orange-900 mt-4">Join Loyalee</Text>
          <Text className="text-gray-500 mb-8 text-center">Start managing your offline rewards today!</Text>

          <View className="w-full flex flex-col gap-4">
            {/* Email */}
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Email"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    className={`textinput ${errors.email ? 'error' : ''}`}
                  />
                )}
              />
              {errors.email && (
                <TextInputError>{errors.email.message}</TextInputError>
              )}
            </View>

            {/* Password */}
            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Password"
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

            {/* Confirm Password */}
            <View>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Confirm Password"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    className={`textinput ${errors.confirm_password ? 'error' : ''}`}
                  />
                )}
              />
              {errors.confirm_password && (
                <TextInputError>{errors.confirm_password.message}</TextInputError>
              )}
            </View>
          </View>

          <VariantButton
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            loading={isSubmitting}
            className="mt-8 w-full"
          >
            Create Account
          </VariantButton>

          <TouchableOpacity onPress={() => router.push('/login')} className="mt-6">
            <Text className="text-gray-500">Already have an account? <Text className="text-orange-900 font-bold">Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}