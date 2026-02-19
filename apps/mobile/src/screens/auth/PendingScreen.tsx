import React from 'react';
import { View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

export function PendingScreen() {
  const { logout } = useAuth();
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-background px-8 items-center justify-center">
      <View className="w-20 h-20 rounded-full bg-accent/20 items-center justify-center mb-6">
        <Clock size={40} color={colors.accent} />
      </View>
      <Text className="font-heading-bold text-2xl text-foreground text-center mb-3">
        Awaiting Approval
      </Text>
      <Text className="font-body text-base text-muted-foreground text-center leading-6 mb-10">
        Your account has been created. An admin will review and approve your access shortly.
      </Text>
      <Button variant="outline" onPress={logout}>
        Sign Out
      </Button>
    </View>
  );
}
