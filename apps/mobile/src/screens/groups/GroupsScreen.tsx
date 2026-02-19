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
import { Search, Users, Plus } from 'lucide-react-native';
import { useTheme } from '../../lib/useTheme';

// ── Types ──────────────────────────────────────────────────
interface GroupInbox {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  lastMessage: string;
  lastSender: string;
  lastTime: string;
  unread: number;
  joined: boolean;
}

// ── Sample data ────────────────────────────────────────────
const MY_GROUPS: GroupInbox[] = [
  {
    id: '1',
    name: "Men's Bible Study",
    description: 'Weekly study through the book of Romans with fellowship and accountability.',
    image: 'https://i.pravatar.cc/200?img=52',
    members: 14,
    lastMessage: 'See everyone Tuesday! Romans 8 this week.',
    lastSender: 'Pastor Johnson',
    lastTime: '2m',
    unread: 3,
    joined: true,
  },
  {
    id: '2',
    name: "Women's Prayer Circle",
    description: 'A safe space for women to share, pray, and grow together in faith.',
    image: 'https://i.pravatar.cc/200?img=32',
    members: 18,
    lastMessage: 'Praying for the Johnson family this week',
    lastSender: 'Sister Williams',
    lastTime: '15m',
    unread: 1,
    joined: true,
  },
  {
    id: '3',
    name: 'Young Adults',
    description: 'Community for college-age and young professionals.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80',
    members: 32,
    lastMessage: 'Game night this Friday at 7! Who\'s in?',
    lastSender: 'Rev. Davis',
    lastTime: '1h',
    unread: 0,
    joined: true,
  },
  {
    id: '4',
    name: 'Worship Team',
    description: 'Rehearsal and spiritual preparation for Sunday worship.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
    members: 12,
    lastMessage: 'New setlist uploaded for Sunday',
    lastSender: 'Minister Taylor',
    lastTime: '3h',
    unread: 5,
    joined: true,
  },
];

const DISCOVER_GROUPS: GroupInbox[] = [
  {
    id: '5',
    name: 'Marriage Enrichment',
    description: 'Strengthening marriages through biblical principles and community.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80',
    members: 10,
    lastMessage: '',
    lastSender: '',
    lastTime: '',
    unread: 0,
    joined: false,
  },
  {
    id: '6',
    name: 'Senior Saints',
    description: 'Fellowship, devotionals, and outings for seasoned members.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80',
    members: 22,
    lastMessage: '',
    lastSender: '',
    lastTime: '',
    unread: 0,
    joined: false,
  },
  {
    id: '7',
    name: 'Community Outreach',
    description: 'Serving our neighborhood with food drives and mentoring.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
    members: 15,
    lastMessage: '',
    lastSender: '',
    lastTime: '',
    unread: 0,
    joined: false,
  },
];

// ── Component ──────────────────────────────────────────────
export function GroupsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* ── Navy header ── */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: insets.top + 8,
          paddingBottom: 18,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                fontSize: 28,
                color: '#f8fafc',
              }}
            >
              Groups
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 13,
                color: colors.accent,
                marginTop: 2,
              }}
            >
              Stay connected
            </Text>
          </View>
          <View style={{ opacity: 0.4 }}>
            <Users size={28} color="#f8fafc" />
          </View>
        </View>

        {/* Search bar */}
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 11,
            marginTop: 16,
          }}
        >
          <Search size={16} color="rgba(255,255,255,0.5)" />
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              marginLeft: 10,
            }}
          >
            Search groups...
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── My Groups ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 13,
              color: colors.accent,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 12,
              marginLeft: 4,
            }}
          >
            My Groups
          </Text>

          <View style={{ gap: 10 }}>
          {MY_GROUPS.map((group) => (
            <View key={group.id} style={{ borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 10 }}>
            <Pressable
              onPress={() => navigation.navigate('GroupChat', { group })}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: pressed ? colors.muted : colors.card,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 12,
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
              {/* Group avatar */}
              <Image
                source={{ uri: group.image }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: colors.muted,
                }}
              />

              {/* Message preview */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'OpenSans_700Bold',
                      fontSize: 15,
                      color: colors.foreground,
                      flex: 1,
                      marginRight: 8,
                    }}
                  >
                    {group.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 12,
                      color: colors.mutedForeground,
                    }}
                  >
                    {group.lastTime}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 13,
                      color: colors.mutedForeground,
                      flex: 1,
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ fontFamily: 'OpenSans_600SemiBold' }}>
                      {group.lastSender}:
                    </Text>
                    {' '}{group.lastMessage}
                  </Text>

                  {group.unread > 0 && (
                    <View
                      style={{
                        backgroundColor: colors.accent,
                        borderRadius: 10,
                        minWidth: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'OpenSans_700Bold',
                          fontSize: 11,
                          color: '#0f1729',
                        }}
                      >
                        {group.unread}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
            </View>
          ))}
          </View>
        </View>

        {/* ── Discover ── */}
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 13,
              color: colors.accent,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 12,
              marginLeft: 24,
            }}
          >
            Discover
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
          >
            {DISCOVER_GROUPS.map((group) => (
              <View
                key={group.id}
                style={{
                  width: 180,
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                  overflow: 'hidden',
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 6,
                    },
                    android: { elevation: 2 },
                  }),
                }}
              >
                <Image
                  source={{ uri: group.image }}
                  style={{ width: '100%', height: 100 }}
                  resizeMode="cover"
                />
                <View style={{ padding: 12 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'OpenSans_700Bold',
                      fontSize: 14,
                      color: colors.foreground,
                      marginBottom: 2,
                    }}
                  >
                    {group.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 12,
                      color: colors.mutedForeground,
                      lineHeight: 16,
                      marginBottom: 8,
                    }}
                  >
                    {group.description}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Users size={12} color={colors.mutedForeground} />
                    <Text
                      style={{
                        fontFamily: 'OpenSans_400Regular',
                        fontSize: 11,
                        color: colors.mutedForeground,
                        marginLeft: 4,
                      }}
                    >
                      {group.members} members
                    </Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: pressed ? '#c99a06' : colors.accent,
                      borderRadius: 10,
                      paddingVertical: 8,
                    })}
                  >
                    <Plus size={14} color="#0f1729" />
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 13,
                        color: '#0f1729',
                        marginLeft: 4,
                      }}
                    >
                      Join
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
