import React from 'react';
import { DollarSign } from 'lucide-react-native';
import { ScreenWrapper, EmptyState } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

export function GivingScreen() {
  const { colors } = useTheme();

  // TODO: Phase 4 - Stripe checkout, donation history
  return (
    <ScreenWrapper>
      <EmptyState
        icon={<DollarSign size={48} color={colors.mutedForeground} />}
        title="Giving"
        subtitle="Online giving coming in a future update"
      />
    </ScreenWrapper>
  );
}
