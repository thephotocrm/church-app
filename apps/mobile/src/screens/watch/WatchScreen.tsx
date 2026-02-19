import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Radio } from 'lucide-react-native';
import { ScreenWrapper, SectionHeader } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';
import { useStreamStatus } from '../../hooks/useStreamStatus';

const SERVICE_THUMBNAILS = [
  'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&q=80',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=80',
  'https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&q=80',
  'https://images.unsplash.com/photo-1519491050282-cf6ff2f9838b?w=400&q=80',
];

const PAST_SERVICES = [
  {
    id: '1',
    title: 'Walking in Faith',
    speaker: 'Pastor Johnson',
    date: 'Feb 9, 2026',
    duration: '45 min',
    thumbnail: SERVICE_THUMBNAILS[0],
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Johnson',
    date: 'Feb 2, 2026',
    duration: '52 min',
    thumbnail: SERVICE_THUMBNAILS[1],
  },
  {
    id: '3',
    title: 'Grace That Transforms',
    speaker: 'Rev. Williams',
    date: 'Jan 26, 2026',
    duration: '38 min',
    thumbnail: SERVICE_THUMBNAILS[2],
  },
  {
    id: '4',
    title: 'Unity in the Body',
    speaker: 'Pastor Johnson',
    date: 'Jan 19, 2026',
    duration: '41 min',
    thumbnail: SERVICE_THUMBNAILS[3],
  },
  {
    id: '5',
    title: 'Hope for Tomorrow',
    speaker: 'Rev. Williams',
    date: 'Jan 12, 2026',
    duration: '47 min',
    thumbnail: SERVICE_THUMBNAILS[4],
  },
];

interface LiveBannerProps {
  hlsUrl: string | null;
  title: string;
}

function LiveBanner({ hlsUrl, title }: LiveBannerProps) {
  const { colors } = useTheme();
  const [videoError, setVideoError] = useState(false);

  return (
    <View className="mb-6">
      {/* Video area */}
      <View
        className="rounded-2xl overflow-hidden mb-3"
        style={{ backgroundColor: colors.primary, aspectRatio: 16 / 9 }}
      >
        {hlsUrl && !videoError ? (
          <Video
            source={{ uri: hlsUrl }}
            shouldPlay
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            style={{ width: '100%', height: '100%' }}
            onError={() => setVideoError(true)}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Play size={32} color="#fff" fill="#fff" />
            </View>
          </View>
        )}
        {/* LIVE badge */}
        <View className="absolute top-3 left-3 flex-row items-center">
          <View
            className="flex-row items-center rounded-full px-3 py-1"
            style={{ backgroundColor: '#dc2626' }}
          >
            <Radio size={12} color="#fff" />
            <Text
              className="ml-1.5"
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 12,
                color: '#fff',
              }}
            >
              LIVE
            </Text>
          </View>
        </View>
      </View>

      <Text className="font-heading-bold text-xl text-foreground">
        {title}
      </Text>
      <Text className="font-body text-sm text-muted-foreground mt-1">
        Streaming now
      </Text>
    </View>
  );
}

interface ServiceCardProps {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  thumbnail: string;
}

function ServiceCard({ title, speaker, date, duration, thumbnail }: ServiceCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable className="mb-4 flex-row" style={{ height: 90 }}>
      {/* Thumbnail */}
      <View className="overflow-hidden" style={{ width: 130, height: 90, borderRadius: 20, marginRight: 16 }}>
        <Image
          source={{ uri: thumbnail }}
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
            {speaker} · {duration}
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

export function WatchScreen() {
  const { status, hlsUrl } = useStreamStatus();

  return (
    <ScreenWrapper>
      {status?.isLive && <LiveBanner hlsUrl={hlsUrl} title={status.title} />}

      {!status?.isLive && (
        <View className="mb-6">
          <View
            className="rounded-2xl overflow-hidden items-center justify-center"
            style={{
              backgroundColor: '#1b294b',
              aspectRatio: 16 / 9,
            }}
          >
            <View
              className="w-14 h-14 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              <Play size={28} color="rgba(255,255,255,0.7)" />
            </View>
            <Text
              className="mt-3"
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              No live service right now
            </Text>
          </View>
        </View>
      )}

      <SectionHeader label="RECENT" title="Past Services" />

      {PAST_SERVICES.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          speaker={service.speaker}
          date={service.date}
          duration={service.duration}
          thumbnail={service.thumbnail}
        />
      ))}
    </ScreenWrapper>
  );
}
