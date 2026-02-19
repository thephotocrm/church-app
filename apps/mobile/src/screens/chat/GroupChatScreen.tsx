import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Info, Send } from 'lucide-react-native';
import { useTheme } from '../../lib/useTheme';

// ── Types ──────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

// ── Sample data ────────────────────────────────────────────
const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    senderId: 'u1',
    senderName: 'Pastor Johnson',
    content: 'Good morning everyone! Hope you all had a blessed week.',
    timestamp: '9:00 AM',
    isMe: false,
  },
  {
    id: '2',
    senderId: 'u2',
    senderName: 'Sister Williams',
    content: 'Good morning Pastor! Ready for tonight\'s study.',
    timestamp: '9:05 AM',
    isMe: false,
  },
  {
    id: '3',
    senderId: 'me',
    senderName: 'You',
    content: 'Morning! Can\'t wait. I\'ve been reading ahead in Romans 8.',
    timestamp: '9:12 AM',
    isMe: true,
  },
  {
    id: '4',
    senderId: 'u1',
    senderName: 'Pastor Johnson',
    content: 'That\'s wonderful! Romans 8 is one of the most powerful chapters. We\'ll be diving deep into verses 28-39 tonight.',
    timestamp: '9:15 AM',
    isMe: false,
  },
  {
    id: '5',
    senderId: 'u3',
    senderName: 'Deacon Brown',
    content: 'Will there be refreshments tonight?',
    timestamp: '10:30 AM',
    isMe: false,
  },
  {
    id: '6',
    senderId: 'u2',
    senderName: 'Sister Williams',
    content: 'I\'m bringing my famous lemon pound cake!',
    timestamp: '10:32 AM',
    isMe: false,
  },
  {
    id: '7',
    senderId: 'me',
    senderName: 'You',
    content: 'Sister Williams your pound cake is the best! See everyone tonight.',
    timestamp: '10:45 AM',
    isMe: true,
  },
  {
    id: '8',
    senderId: 'u1',
    senderName: 'Pastor Johnson',
    content: 'Reminder: we start at 7 PM sharp. Please bring your Bibles and notebooks.',
    timestamp: '3:00 PM',
    isMe: false,
  },
  {
    id: '9',
    senderId: 'u3',
    senderName: 'Deacon Brown',
    content: 'I\'ll be there early to help set up the chairs.',
    timestamp: '3:15 PM',
    isMe: false,
  },
  {
    id: '10',
    senderId: 'me',
    senderName: 'You',
    content: 'See everyone Tuesday! Romans 8 this week.',
    timestamp: '4:00 PM',
    isMe: true,
  },
];

// Group consecutive messages from same sender
function shouldShowSender(messages: ChatMessage[], index: number): boolean {
  if (index === messages.length - 1) return true; // FlatList is inverted, so last = top
  const current = messages[index];
  const next = messages[index + 1]; // next in array = previous visually (inverted)
  return current.senderId !== next.senderId;
}

// ── Component ──────────────────────────────────────────────
export function GroupChatScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const group = route.params?.group;

  const invertedMessages = [...SAMPLE_MESSAGES].reverse();

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showSender = shouldShowSender(invertedMessages, index);

    return (
      <View
        style={{
          alignItems: item.isMe ? 'flex-end' : 'flex-start',
          marginBottom: showSender ? 12 : 3,
          paddingHorizontal: 16,
        }}
      >
        {/* Sender name */}
        {showSender && !item.isMe && (
          <Text
            style={{
              fontFamily: 'OpenSans_600SemiBold',
              fontSize: 12,
              color: colors.accent,
              marginBottom: 3,
              marginLeft: 4,
            }}
          >
            {item.senderName}
          </Text>
        )}

        {/* Bubble */}
        <View
          style={{
            maxWidth: '78%',
            backgroundColor: item.isMe ? colors.accent : colors.card,
            borderRadius: 18,
            borderTopLeftRadius: !item.isMe ? 4 : 18,
            borderTopRightRadius: item.isMe ? 4 : 18,
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderWidth: item.isMe ? 0 : 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 15,
              color: item.isMe ? '#0f1729' : colors.foreground,
              lineHeight: 21,
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 10,
              color: item.isMe ? 'rgba(15,23,41,0.5)' : colors.mutedForeground,
              marginTop: 4,
              alignSelf: 'flex-end',
            }}
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* ── Header ── */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: insets.top + 4,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          style={{ padding: 4 }}
        >
          <ArrowLeft size={24} color="#f8fafc" />
        </Pressable>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 17,
              color: '#f8fafc',
            }}
          >
            {group?.name ?? 'Group Chat'}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 12,
              color: 'rgba(248,250,252,0.6)',
            }}
          >
            {group?.members ?? 0} members
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('GroupDetail', { group })}
          hitSlop={12}
          style={{ padding: 4 }}
        >
          <Info size={22} color="#f8fafc" />
        </Pressable>
      </View>

      {/* ── Date separator ── */}
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <View
          style={{
            backgroundColor: colors.muted,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: 'OpenSans_600SemiBold',
              fontSize: 11,
              color: colors.mutedForeground,
            }}
          >
            Today
          </Text>
        </View>
      </View>

      {/* ── Messages ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={invertedMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={{ paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        />

        {/* ── Input bar ── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingHorizontal: 12,
            paddingTop: 8,
            paddingBottom: Math.max(insets.bottom, 12),
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            style={{
              flex: 1,
              fontFamily: 'OpenSans_400Regular',
              fontSize: 15,
              color: colors.foreground,
              backgroundColor: colors.background,
              borderRadius: 22,
              paddingHorizontal: 16,
              paddingTop: 10,
              paddingBottom: 10,
              maxHeight: 100,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          />
          <Pressable
            style={({ pressed }) => ({
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: pressed ? '#c99a06' : colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            })}
          >
            <Send size={18} color="#0f1729" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
