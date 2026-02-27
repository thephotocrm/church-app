import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  Switch,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Animated,
  PanResponder,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from 'react-native';
import { Heart, Plus, Send, Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Card,
  CardContent,
  CardFooter,
  SectionHeader,
  EmptyState,
  LoadingSpinner,
  Button,
  Input,
} from '../../components/ui';
import { useTheme } from '../../lib/useTheme';
import { useAuth } from '../../contexts/AuthContext';
import { usePrayerRequests } from '../../hooks/usePrayerRequests';
import type { PrayerRequest, CreatePrayerRequestPayload } from '../../services/prayerApi';

// ---------------------------------------------------------------------------
// PrayerCard
// ---------------------------------------------------------------------------
function PrayerCard({
  item,
  onPray,
  prayingId,
  isAdmin,
  onDelete,
}: {
  item: PrayerRequest;
  onPray: (id: string) => void;
  prayingId: string | null;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [textTruncated, setTextTruncated] = useState(false);

  // Swipe-to-delete animation
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gs) =>
        !!isAdmin && gs.dx < -10 && Math.abs(gs.dy) < 20,
      onPanResponderMove: (_evt, gs) => {
        if (gs.dx < 0) {
          translateX.setValue(gs.dx);
        }
      },
      onPanResponderRelease: (_evt, gs) => {
        if (gs.dx < -60) {
          Animated.spring(translateX, {
            toValue: -80,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Prayer Request',
      'Are you sure you want to remove this prayer request?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(item.id),
        },
      ],
    );
  };

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length >= 3) {
      setTextTruncated(true);
    }
  };

  const displayName = item.isAnonymous ? 'Anonymous' : item.authorName || 'Anonymous';
  const timeAgo = formatRelativeTime(item.createdAt);

  return (
    <View className="mb-3 overflow-hidden rounded-xl">
      {/* Delete panel behind card */}
      {isAdmin && (
        <Pressable
          onPress={handleDeletePress}
          className="absolute right-0 top-0 bottom-0 w-20 bg-destructive items-center justify-center rounded-r-xl"
        >
          <Trash2 size={22} color="#ffffff" />
        </Pressable>
      )}

      <Animated.View
        style={{ transform: [{ translateX }] }}
        {...(isAdmin ? panResponder.panHandlers : {})}
      >
        <Card>
          <CardContent>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="font-body-semibold text-sm text-muted-foreground">
                {displayName}
              </Text>
              <Text className="font-body text-xs text-muted-foreground">{timeAgo}</Text>
            </View>
            <Text className="font-body-bold text-base text-foreground mb-1">{item.title}</Text>
            <Text
              className="font-body text-sm text-muted-foreground"
              numberOfLines={expanded ? undefined : 3}
              onTextLayout={handleTextLayout}
            >
              {item.body}
            </Text>
            {textTruncated && (
              <Pressable onPress={() => setExpanded((v) => !v)} className="mt-1">
                <Text className="font-body-semibold text-xs text-accent">
                  {expanded ? 'Show less' : 'Read more'}
                </Text>
              </Pressable>
            )}
          </CardContent>
          <CardFooter>
            <View className="flex-row items-center flex-1">
              <Heart size={14} color={colors.mutedForeground} />
              <Text className="font-body text-xs text-muted-foreground ml-1">
                {item.prayerCount} {item.prayerCount === 1 ? 'prayer' : 'prayers'}
              </Text>
            </View>
            <Pressable
              onPress={() => onPray(item.id)}
              disabled={prayingId === item.id}
              className="flex-row items-center bg-accent/15 px-3 py-1.5 rounded-full active:opacity-70"
            >
              <Heart size={14} color={colors.accent} />
              <Text className="font-body-bold text-xs text-accent ml-1">Pray</Text>
            </Pressable>
          </CardFooter>
        </Card>
      </Animated.View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// SubmitPrayerModal
// ---------------------------------------------------------------------------
function SubmitPrayerModal({
  visible,
  onClose,
  onSubmit,
  prefillName,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: CreatePrayerRequestPayload) => Promise<void>;
  prefillName?: string;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill name when modal opens for authenticated users
  useEffect(() => {
    if (visible && prefillName) {
      setAuthorName(prefillName);
    }
  }, [visible, prefillName]);

  const resetForm = () => {
    setTitle('');
    setBody('');
    setAuthorName('');
    setIsAnonymous(false);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your prayer request.');
      return;
    }
    if (!body.trim()) {
      Alert.alert('Missing Details', 'Please enter the details of your prayer request.');
      return;
    }
    if (!isAnonymous && !authorName.trim()) {
      Alert.alert('Missing Name', 'Please enter your name or choose to submit anonymously.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        authorName: isAnonymous ? 'Anonymous' : authorName.trim(),
        isAnonymous,
        isPublic: true,
      });
      resetForm();
      onClose();
      Alert.alert('Prayer Request Submitted', 'Your prayer request has been shared with the community.');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to submit prayer request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-background"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-4 pt-4">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="font-heading-bold text-xl text-foreground">
                Submit Prayer Request
              </Text>
              <Pressable onPress={onClose} className="active:opacity-70">
                <Text className="font-body-semibold text-base text-accent">Cancel</Text>
              </Pressable>
            </View>

            {/* Form */}
            <Input
              label="Title"
              placeholder="e.g. Healing for a loved one"
              value={title}
              onChangeText={setTitle}
            />

            <Input
              label="Prayer Request"
              placeholder="Share your prayer request with the community..."
              value={body}
              onChangeText={setBody}
              multiline
              numberOfLines={5}
              className="min-h-[120px]"
              textAlignVertical="top"
            />

            {/* Anonymous toggle */}
            <View className="flex-row items-center justify-between mb-4 py-2">
              <View className="flex-1 mr-4">
                <Text className="font-body-semibold text-sm text-foreground">
                  Submit Anonymously
                </Text>
                <Text className="font-body text-xs text-muted-foreground mt-0.5">
                  Your name will not be shown
                </Text>
              </View>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ false: colors.muted, true: colors.accent }}
                thumbColor="#ffffff"
              />
            </View>

            {prefillName && !isAnonymous ? (
              <Text className="font-body text-sm text-muted-foreground mb-4">
                Submitting as <Text className="font-body-bold text-foreground">{prefillName}</Text>
              </Text>
            ) : !isAnonymous ? (
              <Input
                label="Your Name"
                placeholder="Enter your name"
                value={authorName}
                onChangeText={setAuthorName}
              />
            ) : null}

            <Button
              onPress={handleSubmit}
              loading={submitting}
              icon={<Send size={16} color={colors.accentForeground} />}
              className="mt-2"
            >
              Submit Prayer Request
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// PrayerRequestScreen
// ---------------------------------------------------------------------------
export function PrayerRequestScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, token, isAuthenticated } = useAuth();
  const { requests, loading, refreshing, error, refresh, submitRequest, pray, deleteRequest } =
    usePrayerRequests();
  const [modalVisible, setModalVisible] = useState(false);
  const [prayingId, setPrayingId] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'group_admin';

  const handlePray = async (id: string) => {
    setPrayingId(id);
    try {
      await pray(id);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to record prayer.');
    } finally {
      setPrayingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteRequest(id, token);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to delete prayer request.');
    }
  };

  const handleSubmit = async (payload: CreatePrayerRequestPayload) => {
    await submitRequest(payload);
  };

  const handleFabPress = () => {
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      Alert.alert(
        'Submit Prayer Request',
        'Would you like to log in or continue as a guest?',
        [
          { text: 'Log In', onPress: () => navigation.navigate('AuthModal') },
          { text: 'Continue as Guest', onPress: () => setModalVisible(true) },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
    }
  };

  // Initial loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state with no data
  if (error && requests.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <EmptyState
          icon={<Heart size={48} color={colors.mutedForeground} />}
          title="Unable to Load"
          subtitle={error}
          action={<Button onPress={refresh} variant="outline" size="sm">Try Again</Button>}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PrayerCard
            item={item}
            onPray={handlePray}
            prayingId={prayingId}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 96,
          flexGrow: 1,
        }}
        refreshing={refreshing}
        onRefresh={refresh}
        ListHeaderComponent={
          <SectionHeader label="Community" title="Prayer Requests" className="mb-2" />
        }
        ListEmptyComponent={
          <EmptyState
            icon={<Heart size={48} color={colors.mutedForeground} />}
            title="No Prayer Requests"
            subtitle="Be the first to share a prayer request with the community."
          />
        }
      />

      {/* Floating Action Button */}
      <Pressable
        onPress={handleFabPress}
        className="absolute right-5 w-14 h-14 rounded-full bg-accent items-center justify-center active:opacity-80"
        style={{
          bottom: Math.max(insets.bottom, 12) + 64 + 16,
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        }}
      >
        <Plus size={26} color={colors.accentForeground} />
      </Pressable>

      <SubmitPrayerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        prefillName={isAuthenticated ? user?.name : undefined}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60_000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  return new Date(dateString).toLocaleDateString();
}
