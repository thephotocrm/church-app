import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { DollarSign, MessageCircle, ChevronRight, LogOut } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { ScreenWrapper, Avatar, Separator, Button } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-card px-4 py-4 active:opacity-80"
    >
      <View className="mr-3">{icon}</View>
      <Text className="font-body text-base text-foreground flex-1">{label}</Text>
      <ChevronRight size={20} className="text-muted-foreground" />
    </Pressable>
  );
}

export function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <ScreenWrapper padded={false}>
      <View className="items-center py-8 bg-card">
        <Avatar name={user?.name} size="lg" />
        <Text className="font-heading-bold text-xl text-foreground mt-3">
          {user?.name}
        </Text>
        <Text className="font-body text-sm text-muted-foreground mt-1">
          {user?.email}
        </Text>
      </View>

      <View className="mt-4 bg-card rounded-2xl mx-4 overflow-hidden">
        <MenuItem
          icon={<DollarSign size={20} color={colors.accent} />}
          label="Giving"
          onPress={() => navigation.navigate('Giving')}
        />
        <Separator className="ml-12" />
        <MenuItem
          icon={<MessageCircle size={20} color={colors.accent} />}
          label="Messages"
          onPress={() => navigation.navigate('DMList')}
        />
      </View>

      <View className="mx-4 mt-8">
        <Button
          variant="ghost"
          onPress={logout}
          icon={<LogOut size={18} color={colors.destructive} />}
          textClassName="text-destructive"
        >
          Sign Out
        </Button>
      </View>
    </ScreenWrapper>
  );
}
