import { useCallback, useEffect, useRef, useState, MutableRefObject } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { NARRATION_MANIFEST } from '../data/narrationManifest';

interface LessonNarrationState {
  /** Whether narration data exists for this lesson */
  isAvailable: boolean;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Index of the segment currently loaded/playing */
  currentSegmentIndex: number;
  /** Progress within current segment (0–1) */
  segmentProgress: number;
  /** Raw playback position in ms within the current segment */
  positionMs: number;
  /** Overall progress across all segments (0–1) */
  overallProgress: number;
  /** Total number of segments */
  totalSegments: number;
  /** Total duration in milliseconds */
  totalDurationMs: number;
  /** Ref to current segment index (for reading without re-renders) */
  currentSegmentIndexRef: MutableRefObject<number>;
  /** Ref to segment progress (for reading without re-renders) */
  segmentProgressRef: MutableRefObject<number>;
  /** Toggle between play and pause */
  togglePlayback: () => void;
  /** Stop playback and reset to beginning */
  stop: () => void;
  /** Jump to a specific segment */
  skipToSegment: (index: number) => void;
  /** Skip to the next segment */
  skipForward: () => void;
  /** Skip to the previous segment */
  skipBack: () => void;
}

export function useLessonNarration(lessonId: string): LessonNarrationState {
  const narration = NARRATION_MANIFEST[lessonId];
  const isAvailable = !!narration && narration.segments.length > 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [positionMs, setPositionMs] = useState(0);

  const soundRef = useRef<Audio.Sound | null>(null);
  const audioModeSetRef = useRef(false);
  const currentIndexRef = useRef(0);
  const segmentProgressRef = useRef(0);
  const loadGenRef = useRef(0);

  // Keep refs in sync with state (for use inside callbacks and interval readers)
  currentIndexRef.current = currentSegmentIndex;
  segmentProgressRef.current = segmentProgress;

  const totalSegments = narration?.segments.length ?? 0;
  const totalDurationMs = narration?.totalDurationMs ?? 0;

  // Overall progress: completed segments + current segment fraction
  const overallProgress =
    totalSegments > 0
      ? (currentSegmentIndex + segmentProgress) / totalSegments
      : 0;

  /** Ensure audio plays even in silent mode (iOS) */
  const ensureAudioMode = useCallback(async () => {
    if (audioModeSetRef.current) return;
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
    audioModeSetRef.current = true;
  }, []);

  /** Unload the current sound if any */
  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
      } catch {
        // ignore cleanup errors
      }
      soundRef.current = null;
    }
  }, []);

  /** Load and play a specific segment */
  const loadAndPlay = useCallback(
    async (index: number) => {
      if (!narration) return;
      const segment = narration.segments[index];
      if (!segment) return;

      const gen = ++loadGenRef.current;

      await ensureAudioMode();
      await unloadSound();

      const { sound } = await Audio.Sound.createAsync(
        segment.source,
        { shouldPlay: true, progressUpdateIntervalMillis: 50 },
        (status: AVPlaybackStatus) => {
          if (!status.isLoaded) return;
          // Bail if a newer loadAndPlay call has started
          if (gen !== loadGenRef.current) return;

          // Update segment progress and raw position
          if (status.durationMillis && status.durationMillis > 0) {
            setSegmentProgress(
              status.positionMillis / status.durationMillis,
            );
            setPositionMs(status.positionMillis);
          }

          // When segment finishes, auto-advance to next
          if (status.didJustFinish) {
            const nextIndex = currentIndexRef.current + 1;
            if (narration && nextIndex < narration.segments.length) {
              setCurrentSegmentIndex(nextIndex);
              setSegmentProgress(0);
              setPositionMs(0);
              loadAndPlay(nextIndex);
            } else {
              // Reached the end
              setIsPlaying(false);
              setSegmentProgress(1);
            }
          }
        },
      );

      // If a newer load started while we were awaiting, discard this sound
      if (gen !== loadGenRef.current) {
        sound.unloadAsync().catch(() => {});
        return;
      }

      soundRef.current = sound;
      setIsPlaying(true);
    },
    [narration, ensureAudioMode, unloadSound],
  );

  /** Toggle play / pause */
  const togglePlayback = useCallback(async () => {
    if (!isAvailable) return;

    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
        return;
      }
    }

    // No sound loaded yet — start from current segment
    await loadAndPlay(currentSegmentIndex);
  }, [isAvailable, currentSegmentIndex, loadAndPlay]);

  /** Stop and reset */
  const stop = useCallback(async () => {
    await unloadSound();
    setIsPlaying(false);
    setCurrentSegmentIndex(0);
    setSegmentProgress(0);
    setPositionMs(0);
  }, [unloadSound]);

  /** Jump to a specific segment */
  const skipToSegment = useCallback(
    async (index: number) => {
      if (!narration || index < 0 || index >= narration.segments.length) return;
      setCurrentSegmentIndex(index);
      setSegmentProgress(0);
      setPositionMs(0);

      if (isPlaying) {
        await loadAndPlay(index);
      } else {
        // Just update position, don't auto-play
        await unloadSound();
      }
    },
    [narration, isPlaying, loadAndPlay, unloadSound],
  );

  /** Skip to the next segment */
  const skipForward = useCallback(() => {
    if (currentSegmentIndex < totalSegments - 1) {
      skipToSegment(currentSegmentIndex + 1);
    }
  }, [currentSegmentIndex, totalSegments, skipToSegment]);

  /** Skip to the previous segment */
  const skipBack = useCallback(() => {
    if (currentSegmentIndex > 0) {
      skipToSegment(currentSegmentIndex - 1);
    }
  }, [currentSegmentIndex, skipToSegment]);

  // Cleanup on unmount or lesson change
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, [lessonId]);

  // Reset state when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentSegmentIndex(0);
    setSegmentProgress(0);
    setPositionMs(0);
    unloadSound();
  }, [lessonId, unloadSound]);

  return {
    isAvailable,
    isPlaying,
    currentSegmentIndex,
    segmentProgress,
    positionMs,
    overallProgress,
    totalSegments,
    totalDurationMs,
    currentSegmentIndexRef: currentIndexRef,
    segmentProgressRef,
    togglePlayback,
    stop,
    skipToSegment,
    skipForward,
    skipBack,
  };
}
