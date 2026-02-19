import React, { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/ui';

export function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email.trim().toLowerCase(), password);
      Alert.alert(
        'Account Created',
        'Please check your email to verify your account. An admin will approve your access.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 bg-background px-6 justify-center">
        <Text className="font-heading-bold text-3xl text-foreground text-center mb-2">
          Create Account
        </Text>
        <Text className="font-body text-base text-muted-foreground text-center mb-10">
          Join the FPCD community
        </Text>

        <Input
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="Min 8 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button onPress={handleRegister} loading={loading} className="mt-2">
          Create Account
        </Button>

        <Pressable onPress={() => navigation.navigate('Login')} className="mt-6">
          <Text className="font-body text-sm text-accent text-center">
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
