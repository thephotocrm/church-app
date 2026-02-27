import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ArrowLeft, Play, Pause, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { Recording } from '@church-app/shared';
import { useTheme } from '../../lib/useTheme';

const GOLD = '#C9943A';
const WARM_GRAY = '#8C8078';

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function RecordingPlayerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const recording: Recording = route.params.recording;

  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const videoRef = useRef<Video>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubberWidth, setScrubberWidth] = useState(1);

  const creamBg = isDark ? colors.background : '#FAF7F2';
  const inkColor = isDark ? colors.foreground : '#1A1714';

  const resetControlsTimer = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  const enterFullscreen = useCallback(async () => {
    StatusBar.setHidden(true, 'fade');
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setIsFullscreen(true);
    resetControlsTimer();
  }, [resetControlsTimer]);

  const exitFullscreen = useCallback(async () => {
    StatusBar.setHidden(false, 'fade');
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setIsFullscreen(false);
  }, []);

  // Android back button exits fullscreen first, then navigates back
  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFullscreen) {
        exitFullscreen();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [isFullscreen, exitFullscreen]);

  // Restore portrait on unmount
  useEffect(() => {
    return () => {
      StatusBar.setHidden(false, 'fade');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
    resetControlsTimer();
  }, [isPlaying, resetControlsTimer]);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setCurrentTime((status.positionMillis ?? 0) / 1000);
    if (status.durationMillis) setDuration(status.durationMillis / 1000);
    setIsPlaying(status.isPlaying);
  }, []);

  const handleScrub = useCallback(async (locationX: number) => {
    const pct = locationX / scrubberWidth;
    const seekMs = pct * duration * 1000;
    await videoRef.current?.setPositionAsync(seekMs);
    setCurrentTime(pct * duration);
    resetControlsTimer();
  }, [scrubberWidth, duration, resetControlsTimer]);

  return (
    <View style={{ flex: 1, backgroundColor: isFullscreen ? '#000' : creamBg }}>
      {/* Video container */}
      <View
        style={
          isFullscreen
            ? { position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight, zIndex: 50, backgroundColor: '#000' }
            : { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' }
        }
      >
        <Video
          ref={videoRef}
          source={{ uri: recording.r2Url }}
          shouldPlay={true}
          isMuted={isMuted}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
          style={StyleSheet.absoluteFill}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />

        {/* Tap catcher */}
        <Pressable style={StyleSheet.absoluteFill} onPress={resetControlsTimer} />

        {controlsVisible && (
          <>
            {/* Back button — top-left (non-fullscreen only) */}
            {!isFullscreen && (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  position: 'absolute',
                  top: insets.top + 8,
                  left: 12,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowLeft size={18} color="#fff" />
              </Pressable>
            )}

            {/* Center play/pause */}
            <Pressable
              onPress={togglePlayPause}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -28 }, { translateY: -28 }],
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isPlaying ? <Pause size={28} color="#fff" /> : <Play size={28} color="#fff" style={{ marginLeft: 3 }} />}
            </Pressable>

            {/* Bottom bar: mute, progress, fullscreen */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: isFullscreen ? insets.left + 16 : 16,
                paddingBottom: 12,
                paddingTop: 8,
                backgroundColor: 'rgba(0,0,0,0.45)',
              }}
            >
              {/* Progress bar row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Text style={{ color: '#fff', fontSize: 12, fontVariant: ['tabular-nums'] }}>
                  {formatTime(currentTime)}
                </Text>
                <Pressable
                  style={{ flex: 1, height: 20, justifyContent: 'center' }}
                  onLayout={(e) => setScrubberWidth(e.nativeEvent.layout.width)}
                  onPress={(e) => handleScrub(e.nativeEvent.locationX)}
                >
                  <View style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
                    <View
                      style={{
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: GOLD,
                        width: duration > 0 ? `${Math.min((currentTime / duration) * 100, 100)}%` : '0%',
                      }}
                    />
                  </View>
                </Pressable>
                <Text style={{ color: '#fff', fontSize: 12, fontVariant: ['tabular-nums'] }}>
                  {formatTime(duration)}
                </Text>
              </View>

              {/* Controls row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Pressable
                  onPress={() => { setIsMuted((m) => !m); resetControlsTimer(); }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isMuted ? <VolumeX size={18} color="#fff" /> : <Volume2 size={18} color="#fff" />}
                </Pressable>

                <Pressable
                  onPress={isFullscreen ? exitFullscreen : enterFullscreen}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isFullscreen ? <Minimize size={18} color="#fff" /> : <Maximize size={18} color="#fff" />}
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Info below video */}
      {!isFullscreen && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }}
        >
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 22,
              color: inkColor,
              letterSpacing: -0.3,
              lineHeight: 28,
              marginBottom: 8,
            }}
          >
            {recording.title}
          </Text>

          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 13,
              color: WARM_GRAY,
              marginBottom: 16,
            }}
          >
            {formatDate(recording.streamStartedAt)}
          </Text>

          {recording.description ? (
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 14,
                color: isDark ? colors.foreground : '#3D3830',
                lineHeight: 22,
              }}
            >
              {recording.description}
            </Text>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}
