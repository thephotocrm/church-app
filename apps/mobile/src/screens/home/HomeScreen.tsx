import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Clock, Play, BookOpen, MapPin, Radio, MessageSquare, Cross } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Card, CardContent } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';
import { useStreamStatus } from '../../hooks/useStreamStatus';

// Placeholder images
const HERO_IMAGE_URI =
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80';
const SERVICE_THUMB_URI =
  'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&q=80';

const RECENT_SERVICES = [
  {
    id: '1',
    title: 'Sunday Prayer',
    speaker: 'Pastor Johnson',
    duration: '1 hr 30 min',
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Johnson',
    duration: '52 min',
  },
  {
    id: '3',
    title: 'Grace That Transforms',
    speaker: 'Rev. Williams',
    duration: '38 min',
  },
];

function getNextSundayService(): { label: string; diffMs: number } {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let daysUntilSunday = (7 - day) % 7;

  if (day === 0 && (hours < 10 || (hours === 10 && minutes < 30))) {
    daysUntilSunday = 0;
  }
  if (day === 0 && (hours > 10 || (hours === 10 && minutes >= 30))) {
    daysUntilSunday = 7;
  }

  const target = new Date(now);
  target.setDate(target.getDate() + daysUntilSunday);
  target.setHours(10, 30, 0, 0);

  const diffMs = target.getTime() - now.getTime();
  const label = daysUntilSunday === 0 ? 'Today at 10:30 AM' : 'Sunday at 10:30 AM';

  return { label, diffMs };
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Service is starting soon!';

  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);

  return parts.join(' ');
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function QuickAction({ icon, label, onPress }: QuickActionProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} className="items-center active:opacity-70">
      <View
        className="rounded-full items-center justify-center mb-1.5"
        style={{
          width: 60,
          height: 60,
          backgroundColor: colors.card,
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
        }}
      >
        {icon}
      </View>
      <Text
        style={{ fontFamily: 'OpenSans_600SemiBold', fontSize: 11, color: colors.foreground }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

interface RecentServiceCardProps {
  title: string;
  speaker: string;
  duration: string;
  onPress: () => void;
}

function RecentServiceCard({ title, speaker, duration, onPress }: RecentServiceCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} className="mb-4 flex-row" style={{ height: 90 }}>
      {/* Thumbnail */}
      <View className="overflow-hidden" style={{ width: 130, height: 90, borderRadius: 20, marginRight: 16 }}>
        <Image
          source={{ uri: SERVICE_THUMB_URI }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 justify-between" style={{ paddingVertical: 4 }}>
        <View>
          <Text
            numberOfLines={1}
            style={{ fontFamily: 'OpenSans_700Bold', fontSize: 15, color: colors.foreground }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: 'OpenSans_400Regular', fontSize: 12, color: '#9ca3af', marginTop: 2 }}
          >
            {duration}
          </Text>
        </View>
        <View className="flex-row justify-between items-end">
          <Text
            style={{ fontFamily: 'OpenSans_600SemiBold', fontSize: 12, color: colors.accent }}
          >
            Watch Now
          </Text>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={14} color="#fff" fill="#fff" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { status, hlsUrl } = useStreamStatus();
  const [countdown, setCountdown] = useState('');
  const [videoError, setVideoError] = useState(false);
  const [serviceLabel, setServiceLabel] = useState('');

  useEffect(() => {
    function tick() {
      const { label, diffMs } = getNextSundayService();
      setServiceLabel(label);
      setCountdown(formatCountdown(diffMs));
    }

    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  const IMAGE_HEIGHT = 180;
  const PLAY_BTN_SIZE = 44;
  const { width: screenWidth } = useWindowDimensions();
  const CURVE_HEIGHT = 60;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Navy zone: header + search bar + hero card + convex curve ── */}
        <View style={{ backgroundColor: colors.primary, overflow: 'visible', zIndex: 1 }}>
          {/* Custom header */}
          <View
            className="flex-row items-center justify-center"
            style={{ paddingHorizontal: 20, paddingTop: insets.top + 8, paddingBottom: 12 }}
          >
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                fontSize: 26,
                color: '#f8fafc',
              }}
            >
              FPC Dallas
            </Text>
            <Cross size={20} color="#f8fafc" style={{ marginLeft: 10 }} />
          </View>

          <View style={{ paddingHorizontal: 40, paddingTop: 0, paddingBottom: 0, overflow: 'visible' }}>
            {/* Search Bar */}
            <Pressable
              className="px-4 py-3.5 flex-row items-center"
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 2,
              }}
            >
              <Search size={16} color="#9ca3af" />
              <Text
                className="ml-3"
                style={{ fontFamily: 'OpenSans_400Regular', fontSize: 14, color: '#9ca3af' }}
              >
                Search
              </Text>
            </Pressable>

            {/* Hero Card — split: image top + white info bottom */}
            <Pressable
              onPress={status?.isLive ? () => navigation.getParent()?.navigate('Watch') : undefined}
              disabled={!status?.isLive}
              className="overflow-hidden active:opacity-90"
              style={{
                marginTop: 20,
                marginBottom: -20,
                borderRadius: 28,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
              }}
            >
              {/* Image / Video section */}
              <View style={{ height: IMAGE_HEIGHT }}>
                {status?.isLive && hlsUrl && !videoError ? (
                  <Video
                    source={{ uri: hlsUrl }}
                    shouldPlay
                    isMuted
                    resizeMode={ResizeMode.COVER}
                    useNativeControls={false}
                    style={StyleSheet.absoluteFill}
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <Image
                    source={{ uri: HERO_IMAGE_URI }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                )}
                {status?.isLive && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 12,
                    }}
                  >
                    <View
                      className="flex-row items-center rounded-full px-2.5 py-1"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      <Radio size={10} color="#fff" />
                      <Text
                        className="ml-1"
                        style={{ fontFamily: 'OpenSans_700Bold', fontSize: 10, color: '#fff' }}
                      >
                        LIVE
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* White info section */}
              <View style={{ backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 12 }}>
                {status?.isLive ? (
                  <>
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 16,
                        color: colors.foreground,
                      }}
                    >
                      {status.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSans_600SemiBold',
                        fontSize: 12,
                        color: colors.accent,
                        marginTop: 2,
                      }}
                    >
                      Streaming now — tap to watch
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 16,
                        color: colors.foreground,
                      }}
                    >
                      {serviceLabel}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 14,
                        color: colors.accent,
                        marginTop: 2,
                      }}
                    >
                      Starts in {countdown}
                    </Text>
                  </>
                )}
              </View>

              {/* Play button — hidden when live (video is already playing inline) */}
              {!status?.isLive && (
                <View
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: IMAGE_HEIGHT - PLAY_BTN_SIZE / 2,
                    width: PLAY_BTN_SIZE,
                    height: PLAY_BTN_SIZE,
                    borderRadius: PLAY_BTN_SIZE / 2,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                  }}
                >
                  <Play size={20} color={colors.accent} fill={colors.accent} />
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* Convex curve — navy bulges outward into white zone */}
        <Svg
          width={screenWidth}
          height={CURVE_HEIGHT}
          viewBox={`0 0 ${screenWidth} ${CURVE_HEIGHT}`}
          style={{ marginTop: -1 }}
        >
          <Path
            d={`M0,0 L${screenWidth},0 L${screenWidth},0 Q${screenWidth / 2},${CURVE_HEIGHT * 2} 0,0 Z`}
            fill={colors.primary}
          />
        </Svg>

        {/* ── White content zone (no border radius — curve handled by SVG above) ── */}
        <View style={{ backgroundColor: colors.background, paddingTop: 12 }}>
          {/* Quick Actions + Prayer Request — aligned widths */}
          <View className="items-center">
            <View className="flex-row justify-between items-start mb-5" style={{ width: '80%' }}>
              <QuickAction
                icon={<Play size={26} color={colors.foreground} />}
                label="Videos"
                onPress={() => navigation.getParent()?.navigate('Watch')}
              />
              <QuickAction
                icon={<BookOpen size={26} color={colors.foreground} />}
                label="Bible"
                onPress={() => navigation.navigate('Bible')}
              />
              <QuickAction
                icon={<MapPin size={26} color={colors.foreground} />}
                label="Location"
                onPress={() => navigation.navigate('Location')}
              />
            </View>

            {/* Prayer Request Button — same width as icon row */}
            <Pressable
              onPress={() => navigation.navigate('PrayerRequest')}
              className="flex-row items-center justify-center mb-5 active:opacity-70"
              style={{
                height: 50,
                alignSelf: 'center',
                width: '80%',
                backgroundColor: colors.card,
                borderRadius: 25,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            >
              <Text
                style={{ fontFamily: 'OpenSans_600SemiBold', fontSize: 14, color: colors.foreground }}
              >
                Send Prayer Request
              </Text>
              <MessageSquare size={26} color={colors.foreground} style={{ marginLeft: 8 }} />
            </Pressable>
          </View>

          {/* Recently Uploaded */}
          <View className="px-8">
            <Text
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 16,
                color: colors.accent,
                marginBottom: 12,
              }}
            >
              Recently Uploaded
            </Text>

            {RECENT_SERVICES.map((service) => (
              <RecentServiceCard
                key={service.id}
                title={service.title}
                speaker={service.speaker}
                duration={service.duration}
                onPress={() => navigation.getParent()?.navigate('Watch')}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
