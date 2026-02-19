import React from 'react';
import { Heart } from 'lucide-react-native';
import { ScreenWrapper, EmptyState } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

export function PrayerRequestScreen() {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <EmptyState
        icon={<Heart size={48} color={colors.mutedForeground} />}
        title="Prayer Request"
        subtitle="Submit prayer requests in a future update"
      />
    </ScreenWrapper>
  );
}
