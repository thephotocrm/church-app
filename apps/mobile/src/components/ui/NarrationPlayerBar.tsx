import React from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react-native';

interface NarrationPlayerBarProps {
  isPlaying: boolean;
  overallProgress: number;
  currentSegmentIndex: number;
  totalSegments: number;
  totalDurationMs: number;
  accent: string;
  onTogglePlayback: () => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
  bottomInset: number;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function NarrationPlayerBar({
  isPlaying,
  overallProgress,
  currentSegmentIndex,
  totalSegments,
  totalDurationMs,
  accent,
  onTogglePlayback,
  onSkipForward,
  onSkipBack,
  bottomInset,
}: NarrationPlayerBarProps) {
  const elapsedMs = overallProgress * totalDurationMs;
  const canSkipBack = currentSegmentIndex > 0;
  const canSkipForward = currentSegmentIndex < totalSegments - 1;
  const progressPct = `${Math.min(Math.round(overallProgress * 100), 100)}%` as any;

  return (
    <View style={[styles.wrapper, { paddingBottom: bottomInset }]}>
      {/* Frosted glass background */}
      <BlurView
        intensity={40}
        tint="systemChromeMaterialDark"
        style={StyleSheet.absoluteFill}
      />

      {/* Extra tint overlay for depth */}
      <View style={styles.tintOverlay} />

      {/* Top subtle border */}
      <View style={styles.topBorder} />

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: progressPct, backgroundColor: accent },
          ]}
        />
      </View>

      {/* Single-row layout: time — controls — time */}
      <View style={styles.row}>
        <Text style={styles.time}>{formatTime(elapsedMs)}</Text>

        <View style={styles.controls}>
          {/* Skip back */}
          <Pressable
            onPress={onSkipBack}
            hitSlop={12}
            style={[styles.skipBtn, { opacity: canSkipBack ? 1 : 0.3 }]}
          >
            <SkipBack size={18} color="rgba(255,255,255,0.85)" fill="rgba(255,255,255,0.85)" />
          </Pressable>

          {/* Play / Pause */}
          <Pressable
            onPress={onTogglePlayback}
            style={[
              styles.playBtn,
              {
                backgroundColor: accent,
                ...Platform.select({
                  ios: {
                    shadowColor: accent,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  },
                  android: { elevation: 6 },
                }),
              },
            ]}
          >
            {isPlaying ? (
              <Pause size={20} color="#fff" fill="#fff" />
            ) : (
              <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
            )}
          </Pressable>

          {/* Skip forward */}
          <Pressable
            onPress={onSkipForward}
            hitSlop={12}
            style={[styles.skipBtn, { opacity: canSkipForward ? 1 : 0.3 }]}
          >
            <SkipForward size={18} color="rgba(255,255,255,0.85)" fill="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>

        <Text style={[styles.time, { textAlign: 'right' }]}>
          {formatTime(totalDurationMs)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 14, 0.35)',
  },
  topBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  progressTrack: {
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1.25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  time: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.45)',
    width: 40,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  skipBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
