import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  BookOpen,
  HandHeart,
  MapPin,
  Megaphone,
  Heart,
  MessageCircle,
  User,
  Lock,
  LogIn,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper, SectionHeader } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../lib/useTheme';

interface MenuItem {
  label: string;
  icon: typeof BookOpen;
  screen: string;
  requiresAuth?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Bible', icon: BookOpen, screen: 'Bible' },
  { label: 'Prayer Request', icon: HandHeart, screen: 'PrayerRequest' },
  { label: 'Our Location', icon: MapPin, screen: 'Location' },
  { label: 'Announcements', icon: Megaphone, screen: 'Announcements' },
  { label: 'Giving', icon: Heart, screen: 'Giving', requiresAuth: true },
  { label: 'Messages', icon: MessageCircle, screen: 'DMList', requiresAuth: true },
  { label: 'Profile', icon: User, screen: 'ProfileScreen', requiresAuth: true },
];

export function MoreMenuScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const handlePress = (item: MenuItem) => {
    if (item.requiresAuth && !isAuthenticated) {
      navigation.navigate('AuthModal');
      return;
    }
    navigation.navigate(item.screen);
  };

  return (
    <ScreenWrapper>
      <SectionHeader title="Church Tools" className="mt-2" />

      {MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        const locked = item.requiresAuth && !isAuthenticated;

        return (
          <Pressable
            key={item.screen}
            onPress={() => handlePress(item)}
            className="flex-row items-center bg-card rounded-xl border border-border mb-2 px-4 py-3.5 active:opacity-80"
          >
            <View
              className="w-9 h-9 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.accent + '18' }}
            >
              <Icon size={20} color={colors.accent} />
            </View>
            <Text className="font-body-semibold text-base text-foreground flex-1">
              {item.label}
            </Text>
            {locked ? (
              <Lock size={16} color={colors.mutedForeground} />
            ) : (
              <ChevronRight size={18} color={colors.mutedForeground} />
            )}
          </Pressable>
        );
      })}

      {/* Auth section */}
      <View className="mt-6">
        <SectionHeader title="Account" />
        {isAuthenticated ? (
          <>
            <View className="bg-card rounded-xl border border-border px-4 py-3.5 mb-2">
              <Text className="font-body-semibold text-base text-foreground">
                {user?.name}
              </Text>
              <Text className="font-body text-sm text-muted-foreground">
                {user?.email}
              </Text>
            </View>
            <Pressable
              onPress={logout}
              className="flex-row items-center bg-card rounded-xl border border-border px-4 py-3.5 active:opacity-80"
            >
              <LogOut size={20} color={colors.destructive} style={{ marginRight: 12 }} />
              <Text className="font-body-semibold text-base text-destructive">
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('AuthModal')}
            className="flex-row items-center bg-accent rounded-xl px-4 py-3.5 active:opacity-80"
          >
            <LogIn size={20} color={colors.accentForeground} style={{ marginRight: 12 }} />
            <Text className="font-body-bold text-base text-accent-foreground">
              Sign In / Create Account
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenWrapper>
  );
}
