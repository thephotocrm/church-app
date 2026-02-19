import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, BellOff, LogOut, Users } from 'lucide-react-native';
import { useTheme } from '../../lib/useTheme';

// ── Sample members ─────────────────────────────────────────
const SAMPLE_MEMBERS = [
  { id: '1', name: 'Pastor Johnson', role: 'Leader', image: 'https://i.pravatar.cc/100?img=11' },
  { id: '2', name: 'Sister Williams', role: 'Co-leader', image: 'https://i.pravatar.cc/100?img=5' },
  { id: '3', name: 'Deacon Brown', role: 'Member', image: 'https://i.pravatar.cc/100?img=12' },
  { id: '4', name: 'Mary Taylor', role: 'Member', image: 'https://i.pravatar.cc/100?img=9' },
  { id: '5', name: 'James Wilson', role: 'Member', image: 'https://i.pravatar.cc/100?img=8' },
  { id: '6', name: 'Ruth Davis', role: 'Member', image: 'https://i.pravatar.cc/100?img=16' },
];

// ── Component ──────────────────────────────────────────────
export function GroupDetailScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const group = route.params?.group;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero image ── */}
        <View style={{ height: 220, position: 'relative' }}>
          <Image
            source={{ uri: group?.image ?? 'https://images.unsplash.com/photo-1529070538774-1795d8de2dfe?w=800&q=80' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />

          {/* Back button */}
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={{
              position: 'absolute',
              top: insets.top + 8,
              left: 16,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color="#f8fafc" />
          </Pressable>
        </View>

        {/* ── Group info ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 26,
              color: colors.foreground,
              marginBottom: 8,
            }}
          >
            {group?.name ?? 'Group'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Users size={14} color={colors.accent} />
            <Text
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 13,
                color: colors.mutedForeground,
                marginLeft: 6,
              }}
            >
              {group?.members ?? 0} members
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 15,
              color: colors.mutedForeground,
              lineHeight: 22,
              marginBottom: 24,
            }}
          >
            {group?.description ?? 'No description available.'}
          </Text>

          {/* ── Action buttons ── */}
          <View style={{ gap: 10, marginBottom: 28 }}>
            <Pressable
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: pressed ? colors.muted : colors.card,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 14,
                paddingHorizontal: 16,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 3,
                  },
                  android: { elevation: 1 },
                }),
              })}
            >
              <BellOff size={18} color={colors.mutedForeground} />
              <Text
                style={{
                  fontFamily: 'OpenSans_600SemiBold',
                  fontSize: 15,
                  color: colors.foreground,
                  marginLeft: 12,
                }}
              >
                Mute Notifications
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: pressed ? colors.muted : colors.card,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 14,
                paddingHorizontal: 16,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 3,
                  },
                  android: { elevation: 1 },
                }),
              })}
            >
              <LogOut size={18} color={colors.destructive} />
              <Text
                style={{
                  fontFamily: 'OpenSans_600SemiBold',
                  fontSize: 15,
                  color: colors.destructive,
                  marginLeft: 12,
                }}
              >
                Leave Group
              </Text>
            </Pressable>
          </View>

          {/* ── Members ── */}
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 13,
              color: colors.accent,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
              marginLeft: 4,
            }}
          >
            Members
          </Text>

          {SAMPLE_MEMBERS.map((member) => (
            <View
              key={member.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Image
                source={{ uri: member.image }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.muted,
                }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 15,
                    color: colors.foreground,
                  }}
                >
                  {member.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 12,
                    color: member.role === 'Leader' || member.role === 'Co-leader'
                      ? colors.accent
                      : colors.mutedForeground,
                  }}
                >
                  {member.role}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
