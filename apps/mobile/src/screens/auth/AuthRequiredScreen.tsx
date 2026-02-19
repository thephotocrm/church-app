import React from 'react';
import { Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper, EmptyState, Button } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

export function AuthRequiredScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <EmptyState
        icon={<Lock size={48} color={colors.mutedForeground} />}
        title="Sign In Required"
        subtitle="Create an account or sign in to access this feature."
        action={
          <Button onPress={() => navigation.navigate('AuthModal')}>
            Sign In
          </Button>
        }
      />
    </ScreenWrapper>
  );
}
