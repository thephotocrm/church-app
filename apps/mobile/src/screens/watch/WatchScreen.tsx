import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Play, Pause, Radio, ArrowLeft, Bell, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { Recording } from '@church-app/shared';
import { useTheme } from '../../lib/useTheme';
import { useStreamStatus } from '../../hooks/useStreamStatus';
import { useRecordings } from '../../hooks/useRecordings';

// ── Palette ──────────────────────────────────────────────────────
const GOLD = '#C9943A';
const GOLD_LIGHT = '#E8B860';
const WARM_GRAY = '#8C8078';

// ── Helpers ───────────────────────────────────────────────────────
function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function WatchScreen() {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { status, hlsUrl } = useStreamStatus();
  const { recordings, loading, loadingMore, error, hasMore, loadMore } = useRecordings();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [videoError, setVideoError] = useState(false);

  // Live stream player state
  const liveVideoRef = useRef<Video>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liveMuted, setLiveMuted] = useState(false);
  const [livePlaying, setLivePlaying] = useState(true);
  const [liveControlsVisible, setLiveControlsVisible] = useState(true);
  const liveControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const creamBg = isDark ? colors.background : '#FAF7F2';
  const inkColor = isDark ? colors.foreground : '#1A1714';
  const cardBg = isDark ? colors.card : '#FFFFFF';
  const borderColor = isDark ? colors.border : 'rgba(26,23,20,0.07)';

  // ── Live stream controls ──
  const resetLiveControlsTimer = useCallback(() => {
    setLiveControlsVisible(true);
    if (liveControlsTimerRef.current) clearTimeout(liveControlsTimerRef.current);
    liveControlsTimerRef.current = setTimeout(() => setLiveControlsVisible(false), 3000);
  }, []);

  const enterFullscreen = useCallback(async () => {
    StatusBar.setHidden(true, 'fade');
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setIsFullscreen(true);
    resetLiveControlsTimer();
  }, [resetLiveControlsTimer]);

  const exitFullscreen = useCallback(async () => {
    StatusBar.setHidden(false, 'fade');
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setIsFullscreen(false);
  }, []);

  // Android back button exits fullscreen first
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

  const toggleLivePlayPause = useCallback(async () => {
    if (livePlaying) {
      await liveVideoRef.current?.pauseAsync();
    } else {
      await liveVideoRef.current?.playAsync();
    }
    setLivePlaying(!livePlaying);
    resetLiveControlsTimer();
  }, [livePlaying, resetLiveControlsTimer]);

  function openRecording(recording: Recording) {
    navigation.navigate('RecordingPlayer', { recording });
  }

  const featured = recordings[0] ?? null;
  const pastVideos = recordings.slice(1);

  return (
    <View style={{ flex: 1, backgroundColor: creamBg }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        {!isFullscreen && <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: insets.top + 10,
            paddingBottom: 18,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            className="active:opacity-70"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: cardBg,
              borderRadius: 100,
              paddingVertical: 7,
              paddingLeft: 10,
              paddingRight: 14,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.07,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <ArrowLeft size={14} color={WARM_GRAY} />
            <Text
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 13,
                color: WARM_GRAY,
                marginLeft: 5,
              }}
            >
              More
            </Text>
          </Pressable>

          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 20,
              color: inkColor,
              letterSpacing: -0.3,
            }}
          >
            Watch
          </Text>

          {/* Spacer to keep title centered */}
          <View style={{ width: 70 }} />
        </View>}

        {/* ── Live Player / Offline State ── */}
        <View style={isFullscreen ? { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, backgroundColor: '#000' } : { marginHorizontal: 16 }}>
          <View
            style={isFullscreen ? {
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#000',
            } : {
              borderRadius: 24,
              overflow: 'hidden',
              aspectRatio: 16 / 9,
              backgroundColor: '#0D0A07',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 32,
              elevation: 6,
            }}
          >
            {status?.isLive && hlsUrl && !videoError ? (
              <>
                <Video
                  ref={liveVideoRef}
                  source={{ uri: hlsUrl }}
                  shouldPlay={livePlaying}
                  isMuted={liveMuted}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls={false}
                  style={StyleSheet.absoluteFill}
                  onError={() => setVideoError(true)}
                />

                {/* Tap catcher to show/hide controls */}
                <Pressable
                  style={StyleSheet.absoluteFill}
                  onPress={resetLiveControlsTimer}
                />

                {liveControlsVisible && (
                  <>
                    {/* LIVE badge — top-left */}
                    <View style={{ position: 'absolute', top: 12, left: isFullscreen ? insets.left + 14 : 14 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#dc2626',
                          borderRadius: 100,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        <Radio size={10} color="#fff" />
                        <Text
                          style={{
                            fontFamily: 'OpenSans_700Bold',
                            fontSize: 10,
                            color: '#fff',
                            marginLeft: 5,
                          }}
                        >
                          LIVE
                        </Text>
                      </View>
                    </View>

                    {/* Center play/pause */}
                    <Pressable
                      onPress={toggleLivePlayPause}
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
                      {livePlaying
                        ? <Pause size={28} color="#fff" />
                        : <Play size={28} color="#fff" style={{ marginLeft: 3 }} />}
                    </Pressable>

                    {/* Bottom bar: mute + fullscreen */}
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: isFullscreen ? insets.left + 16 : 16,
                        paddingBottom: 12,
                        paddingTop: 8,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                      }}
                    >
                      {/* Mute toggle */}
                      <Pressable
                        onPress={() => { setLiveMuted(m => !m); resetLiveControlsTimer(); }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {liveMuted
                          ? <VolumeX size={18} color="#fff" />
                          : <Volume2 size={18} color="#fff" />}
                      </Pressable>

                      {/* Fullscreen toggle */}
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
                        {isFullscreen
                          ? <Minimize size={18} color="#fff" />
                          : <Maximize size={18} color="#fff" />}
                      </Pressable>
                    </View>
                  </>
                )}

                {/* LIVE badge always visible even when controls hidden */}
                {!liveControlsVisible && (
                  <View style={{ position: 'absolute', top: 12, left: isFullscreen ? insets.left + 14 : 14 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#dc2626',
                        borderRadius: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <Radio size={10} color="#fff" />
                      <Text
                        style={{
                          fontFamily: 'OpenSans_700Bold',
                          fontSize: 10,
                          color: '#fff',
                          marginLeft: 5,
                        }}
                      >
                        LIVE
                      </Text>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <LinearGradient
                colors={['#1A1209', '#3D2B0E', '#5C3D15']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 40,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: 'rgba(201,148,58,0.35)',
                      backgroundColor: 'rgba(201,148,58,0.1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Play size={22} color={GOLD_LIGHT} style={{ marginLeft: 3 }} />
                  </View>
                  <Text
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                      marginTop: 12,
                    }}
                  >
                    No live service right now
                  </Text>
                </View>

                <LinearGradient
                  colors={['transparent', 'rgba(13,10,7,0.95)']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 14,
                    paddingHorizontal: 16,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 9,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: GOLD,
                        marginBottom: 2,
                      }}
                    >
                      Next Live
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 15,
                        color: '#fff',
                        letterSpacing: -0.3,
                      }}
                    >
                      Sunday · 10:30 AM
                    </Text>
                  </View>
                  <Pressable
                    className="active:opacity-80"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(201,148,58,0.2)',
                      borderWidth: 1,
                      borderColor: 'rgba(201,148,58,0.35)',
                      borderRadius: 100,
                      paddingVertical: 7,
                      paddingHorizontal: 13,
                    }}
                  >
                    <Bell size={12} color={GOLD_LIGHT} style={{ marginRight: 5 }} />
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 11,
                        color: GOLD_LIGHT,
                      }}
                    >
                      Remind Me
                    </Text>
                  </Pressable>
                </LinearGradient>
              </LinearGradient>
            )}
          </View>
        </View>

        {/* ── Loading State ── */}
        {!isFullscreen && loading && (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <ActivityIndicator color={GOLD} size="large" />
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 13,
                color: WARM_GRAY,
                marginTop: 12,
              }}
            >
              Loading sermons...
            </Text>
          </View>
        )}

        {/* ── Error State ── */}
        {!isFullscreen && !loading && error && (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 14,
                color: WARM_GRAY,
              }}
            >
              {error}
            </Text>
          </View>
        )}

        {/* ── Featured Video ── */}
        {!isFullscreen && !loading && featured && (
          <View style={{ paddingHorizontal: 16, marginTop: 22, marginBottom: 22 }}>
            <Pressable onPress={() => openRecording(featured)} className="active:opacity-90">
              <View
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  aspectRatio: 16 / 9,
                  backgroundColor: '#1A1209',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.14,
                  shadowRadius: 24,
                  elevation: 5,
                }}
              >
                {featured.thumbnailUrl ? (
                  <Image
                    source={{ uri: featured.thumbnailUrl }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : (
                  <LinearGradient
                    colors={['#2D1B69', '#5B3FAF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}

                {/* Bottom overlay */}
                <LinearGradient
                  colors={['transparent', 'rgba(13,10,7,0.2)', 'rgba(13,10,7,0.92)']}
                  locations={[0, 0.5, 1]}
                  style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end', padding: 18 }]}
                >
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: GOLD,
                      borderRadius: 100,
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      marginBottom: 8,
                    }}
                  >
                    <Play size={8} color="#1A1714" fill="#1A1714" style={{ marginRight: 4 }} />
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 10,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#1A1714',
                      }}
                    >
                      Latest Sermon
                    </Text>
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'PlayfairDisplay_700Bold',
                      fontSize: 22,
                      color: '#fff',
                      letterSpacing: -0.4,
                      lineHeight: 26,
                      marginBottom: 5,
                    }}
                  >
                    {featured.title}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {featured.duration > 0 && (
                      <Text
                        style={{
                          fontFamily: 'OpenSans_400Regular',
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {formatDuration(featured.duration)}
                      </Text>
                    )}
                    {featured.duration > 0 && featured.streamStartedAt && (
                      <View
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: 1.5,
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          marginHorizontal: 6,
                        }}
                      />
                    )}
                    {featured.streamStartedAt && (
                      <Text
                        style={{
                          fontFamily: 'OpenSans_400Regular',
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {formatDate(featured.streamStartedAt)}
                      </Text>
                    )}
                  </View>
                </LinearGradient>

                {/* Glass play button */}
                <View
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.25)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={18} color="#fff" fill="#fff" />
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* ── Past Services ── */}
        {!isFullscreen && !loading && pastVideos.length > 0 && (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 11,
                  letterSpacing: 1.8,
                  textTransform: 'uppercase',
                  color: WARM_GRAY,
                }}
              >
                Past Services
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16, gap: 10 }}>
              {pastVideos.map((video) => (
                <Pressable
                  key={video.id}
                  onPress={() => openRecording(video)}
                  className="active:opacity-80"
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    paddingRight: 14,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    elevation: 2,
                  }}
                >
                  {/* Thumbnail */}
                  <View
                    style={{
                      width: 80,
                      height: 56,
                      borderRadius: 12,
                      overflow: 'hidden',
                      marginRight: 14,
                      backgroundColor: '#1A1209',
                    }}
                  >
                    {video.thumbnailUrl ? (
                      <Image
                        source={{ uri: video.thumbnailUrl }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    ) : (
                      <LinearGradient
                        colors={['#2D1B69', '#5B3FAF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                      />
                    )}
                    <View
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Play size={10} color="#1A1714" fill="#1A1714" style={{ marginLeft: 1 }} />
                      </View>
                    </View>
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 13,
                        color: inkColor,
                        lineHeight: 18,
                        marginBottom: 4,
                      }}
                    >
                      {video.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                      {video.streamStartedAt && (
                        <Text
                          style={{
                            fontFamily: 'OpenSans_400Regular',
                            fontSize: 11.5,
                            color: WARM_GRAY,
                          }}
                        >
                          {formatDate(video.streamStartedAt)}
                        </Text>
                      )}
                      {video.streamStartedAt && video.duration > 0 && (
                        <View
                          style={{
                            width: 3,
                            height: 3,
                            borderRadius: 1.5,
                            backgroundColor: WARM_GRAY,
                            opacity: 0.4,
                          }}
                        />
                      )}
                      {video.duration > 0 && (
                        <Text
                          style={{
                            fontFamily: 'OpenSans_400Regular',
                            fontSize: 11.5,
                            color: WARM_GRAY,
                          }}
                        >
                          {formatDuration(video.duration)}
                        </Text>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* ── Load More ── */}
            {hasMore && (
              <Pressable
                onPress={loadMore}
                disabled={loadingMore}
                className="active:opacity-80"
                style={{
                  marginHorizontal: 16,
                  marginTop: 16,
                  paddingVertical: 14,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: borderColor,
                  backgroundColor: cardBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {loadingMore ? (
                  <ActivityIndicator color={GOLD} size="small" />
                ) : (
                  <Text
                    style={{
                      fontFamily: 'OpenSans_600SemiBold',
                      fontSize: 14,
                      color: GOLD,
                    }}
                  >
                    Load More
                  </Text>
                )}
              </Pressable>
            )}
          </>
        )}

        {/* ── Empty State ── */}
        {!isFullscreen && !loading && !error && recordings.length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 }}>
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                fontSize: 18,
                color: inkColor,
                marginBottom: 8,
              }}
            >
              No Past Services
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 14,
                color: WARM_GRAY,
                textAlign: 'center',
              }}
            >
              Check back after our next service.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
