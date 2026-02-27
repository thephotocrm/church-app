import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable, ScrollView, Platform, LayoutChangeEvent, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Flame, CheckCircle, Headphones } from 'lucide-react-native';
import { NarrationPlayerBar } from '../../components/ui/NarrationPlayerBar';
import { useTheme } from '../../lib/useTheme';
import { useLessonNarration } from '../../hooks/useLessonNarration';
import { NARRATION_MANIFEST } from '../../data/narrationManifest';
import type { GuidedStudy, StudyLesson } from '../../data/bibleStudies';
import type { SegmentType, WordTiming } from '../../data/narrationManifest';

// ── NarratedText: word-level highlighting during narration ──────────────────

interface NarratedTextProps {
  text: string;
  words: WordTiming[];
  positionMs: number;
  displayStartMs: number;
  isActive: boolean;
  accent: string;
  style: TextStyle;
  children?: React.ReactNode; // for drop cap support
}

function NarratedText({
  text,
  words,
  positionMs,
  displayStartMs,
  isActive,
  accent,
  style,
  children,
}: NarratedTextProps) {
  // When not active or no word data: render plain text (zero overhead)
  if (!isActive || words.length === 0) {
    return <Text style={style}>{children}{children ? text.slice(1) : text}</Text>;
  }

  // Position in seconds (word timings are absolute from segment start)
  const positionSec = positionMs / 1000;

  // Split display text into words, preserving whitespace
  const textWords = text.split(/(\s+)/);

  // Find timing offset: word timings may include spoken intro words
  // (e.g. pronunciation section) that aren't in the display text.
  // Match first two display words against the timing array to find where
  // the display text begins.
  const displayWords = textWords.filter(t => /[a-zA-Z]/.test(t));
  let timingOffset = 0;
  if (words.length > displayWords.length && displayWords.length > 1) {
    const norm = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const first = norm(displayWords[0]);
    const second = norm(displayWords[1]);
    for (let i = 0; i < words.length - 1; i++) {
      if (norm(words[i].word) === first && norm(words[i + 1].word) === second) {
        timingOffset = i;
        break;
      }
    }
  }

  let wordIdx = 0;
  return (
    <Text style={style}>
      {children}
      {textWords.map((token, i) => {
        // Whitespace tokens pass through
        if (/^\s+$/.test(token)) {
          return token;
        }

        // Punctuation-only tokens (em dash, etc.) — don't consume a timing entry
        if (!/[a-zA-Z0-9]/.test(token)) {
          return token;
        }

        const timing = words[timingOffset + wordIdx];
        wordIdx++;

        if (!timing) {
          // No timing data for this word — render normally
          return token;
        }

        const isCurrent = positionSec >= timing.start && positionSec < timing.end;
        const isSpoken = positionSec >= timing.end;
        const recentlySpoken = isSpoken && positionSec < timing.end + 0.35;

        return (
          <Text
            key={i}
            style={[
              isCurrent && {
                backgroundColor: `${accent}20`,
                borderRadius: 4,
                overflow: 'hidden',
              },
              recentlySpoken && {
                backgroundColor: `${accent}10`,
                borderRadius: 4,
                overflow: 'hidden',
              },
              isSpoken && { opacity: 1.0 },
              isCurrent && { opacity: 1.0 },
              !isSpoken && !isCurrent && { opacity: 0.55 },
            ]}
          >
            {token}
          </Text>
        );
      })}
    </Text>
  );
}

interface Props {
  study: GuidedStudy;
  lesson: StudyLesson;
  isCompleted: boolean;
  hasNextLesson: boolean;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
  onNextLesson: () => void;
}

export function StudyLessonView({
  study,
  lesson,
  isCompleted,
  hasNextLesson,
  onBack,
  onComplete,
  onNextLesson,
}: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const accent = study.accent;

  const primaryScripture = lesson.scriptures.find((s) => s.isPrimary);
  const supportingScriptures = lesson.scriptures.filter((s) => !s.isPrimary);

  // ── Narration ──
  const narration = useLessonNarration(lesson.id);
  const scrollRef = useRef<ScrollView>(null);
  const sectionYRef = useRef<Record<number, number>>({});

  /**
   * Segment mapping: maps each rendered section to its narration segment index.
   * Order MUST match the generation script.
   */
  // Access the manifest for word timing data
  const manifest = NARRATION_MANIFEST[lesson.id];

  const segmentMap = useMemo(() => {
    const map: { type: SegmentType; typeIndex: number; segmentIndex: number }[] = [];
    let idx = 0;
    // 0: intro (plays over hero header — no scroll target)
    map.push({ type: 'intro', typeIndex: 0, segmentIndex: idx++ });
    // 1: opening_thought
    map.push({ type: 'opening_thought', typeIndex: 0, segmentIndex: idx++ });
    // 2: primary_scripture
    map.push({ type: 'primary_scripture', typeIndex: 0, segmentIndex: idx++ });
    // 3–4: supporting_scripture[0..n]
    supportingScriptures.forEach((_, i) => {
      map.push({ type: 'supporting_scripture', typeIndex: i, segmentIndex: idx++ });
    });
    // 5–9: content[0..n]
    lesson.content.forEach((_, i) => {
      map.push({ type: 'content', typeIndex: i, segmentIndex: idx++ });
    });
    // 10–11: word_study[0..n]
    lesson.wordStudies.forEach((_, i) => {
      map.push({ type: 'word_study', typeIndex: i, segmentIndex: idx++ });
    });
    // 12: key_insight
    map.push({ type: 'key_insight', typeIndex: 0, segmentIndex: idx++ });
    // 13–15: reflection_question[0..n]
    lesson.reflectionQuestions.forEach((_, i) => {
      map.push({ type: 'reflection_question', typeIndex: i, segmentIndex: idx++ });
    });
    return map;
  }, [supportingScriptures, lesson.content, lesson.wordStudies, lesson.reflectionQuestions]);

  /** Check if a given section is the currently-playing segment */
  const isHighlighted = useCallback(
    (type: SegmentType, typeIndex: number) => {
      if (!narration.isPlaying && !narration.isAvailable) return false;
      const entry = segmentMap.find(
        (s) => s.type === type && s.typeIndex === typeIndex,
      );
      return entry ? entry.segmentIndex === narration.currentSegmentIndex : false;
    },
    [segmentMap, narration.isPlaying, narration.isAvailable, narration.currentSegmentIndex],
  );

  /** Highlight background style */
  const highlightStyle = (active: boolean) =>
    active
      ? {
          backgroundColor: `${accent}15`,
          borderRadius: 12,
          marginHorizontal: -8,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }
      : {};

  /** Y offset of the content container within the ScrollView (accounts for hero header) */
  const contentOffsetY = useRef(0);
  const onContentLayout = useCallback((e: LayoutChangeEvent) => {
    contentOffsetY.current = e.nativeEvent.layout.y;
  }, []);

  /** Y offset of the scripture card within the content container */
  const scriptureCardY = useRef(0);
  const onScriptureCardLayout = useCallback((e: LayoutChangeEvent) => {
    scriptureCardY.current = e.nativeEvent.layout.y;
  }, []);

  /** Track Y position of a section for auto-scroll (stored relative to immediate parent) */
  const onSectionLayout = useCallback(
    (segmentIndex: number) => (e: LayoutChangeEvent) => {
      sectionYRef.current[segmentIndex] = e.nativeEvent.layout.y;
    },
    [],
  );

  /** Find segment index for a given type + typeIndex */
  const segmentIndexFor = useCallback(
    (type: SegmentType, typeIndex: number) => {
      const entry = segmentMap.find(
        (s) => s.type === type && s.typeIndex === typeIndex,
      );
      return entry?.segmentIndex ?? -1;
    },
    [segmentMap],
  );

  /** Get word timing data for a segment */
  const getSegmentWords = useCallback(
    (type: SegmentType, typeIndex: number) => {
      const idx = segmentIndexFor(type, typeIndex);
      if (idx < 0 || !manifest) return { words: [] as WordTiming[], displayStartMs: 0 };
      const seg = manifest.segments[idx];
      return seg ? { words: seg.words, displayStartMs: seg.displayStartMs } : { words: [] as WordTiming[], displayStartMs: 0 };
    },
    [segmentIndexFor, manifest],
  );

  // Scroll to the current segment when it changes during playback
  const SCROLL_TOP_OFFSET = 100;
  useEffect(() => {
    if (!narration.isPlaying || !scrollRef.current) return;

    const rawY = sectionYRef.current[narration.currentSegmentIndex];
    if (rawY == null) return;

    // Sections nested inside the scripture card report Y relative to the card,
    // so add the card's own offset for those segments.
    const entry = segmentMap[narration.currentSegmentIndex];
    const isNestedInCard =
      entry?.type === 'primary_scripture' || entry?.type === 'supporting_scripture';

    const sectionY = isNestedInCard
      ? contentOffsetY.current + scriptureCardY.current + rawY
      : contentOffsetY.current + rawY;

    const targetY = Math.max(0, sectionY - SCROLL_TOP_OFFSET);
    scrollRef.current.scrollTo({ y: targetY, animated: true });
  }, [narration.isPlaying, narration.currentSegmentIndex, segmentMap]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + (narration.isAvailable ? 110 : 96) }}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══════ Section 1: Hero Header ═══════ */}
        <LinearGradient
          colors={study.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 20,
            paddingBottom: 40,
            paddingHorizontal: 24,
            minHeight: 380,
            justifyContent: 'flex-end',
          }}
        >
          {/* Back button */}
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={{
              position: 'absolute',
              top: insets.top + 20,
              left: 20,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={22} color="#f8fafc" />
          </Pressable>

          {/* Lesson pill badge */}
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: `${accent}33`,
              paddingHorizontal: 14,
              paddingVertical: 5,
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 12,
                color: accent,
                letterSpacing: 1,
              }}
            >
              LESSON {lesson.number}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 34,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            {lesson.title}
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_400Regular',
              fontSize: 16,
              color: 'rgba(255,255,255,0.75)',
              fontStyle: 'italic',
              marginBottom: 16,
            }}
          >
            {lesson.subtitle}
          </Text>

          {/* Decorative line */}
          <View
            style={{
              width: 40,
              height: 3,
              borderRadius: 2,
              backgroundColor: accent,
            }}
          />

          {/* Estimated listen time */}
          {narration.isAvailable && narration.totalDurationMs > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 14,
              }}
            >
              <Headphones size={14} color="rgba(255,255,255,0.6)" />
              <Text
                style={{
                  fontFamily: 'OpenSans_600SemiBold',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  marginLeft: 6,
                }}
              >
                {Math.round(narration.totalDurationMs / 60000)} min listen
              </Text>
            </View>
          )}
        </LinearGradient>

        <View style={{ paddingHorizontal: 24 }} onLayout={onContentLayout}>
          {/* ═══════ Section 2: Opening Thought ═══════ */}
          <View
            onLayout={onSectionLayout(segmentIndexFor('opening_thought', 0))}
            style={{
              marginTop: 32,
              marginBottom: 36,
              paddingLeft: 16,
              borderLeftWidth: 3,
              borderLeftColor: accent,
              ...highlightStyle(isHighlighted('opening_thought', 0)),
            }}
          >
            <NarratedText
              text={lesson.openingThought}
              words={getSegmentWords('opening_thought', 0).words}
              displayStartMs={getSegmentWords('opening_thought', 0).displayStartMs}
              positionMs={narration.positionMs}
              isActive={isHighlighted('opening_thought', 0) && narration.isPlaying}
              accent={accent}
              style={{
                fontFamily: 'PlayfairDisplay_400Regular',
                fontSize: 18,
                lineHeight: 30,
                color: colors.foreground,
                fontStyle: 'italic',
              }}
            />
          </View>

          {/* ═══════ Section 3: Scripture Passage ═══════ */}
          <View
            onLayout={onScriptureCardLayout}
            style={{
              backgroundColor: isDark ? `${accent}10` : `${accent}08`,
              borderRadius: 16,
              padding: 20,
              marginBottom: 36,
            }}
          >
            <Text
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 11,
                color: accent,
                letterSpacing: 1.5,
                marginBottom: 16,
              }}
            >
              SCRIPTURE READING
            </Text>

            {primaryScripture && (
              <View
                onLayout={onSectionLayout(segmentIndexFor('primary_scripture', 0))}
                style={highlightStyle(isHighlighted('primary_scripture', 0))}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSans_700Bold',
                    fontSize: 14,
                    color: colors.foreground,
                    marginBottom: 8,
                  }}
                >
                  {primaryScripture.reference}
                </Text>
                <NarratedText
                  text={primaryScripture.text}
                  words={getSegmentWords('primary_scripture', 0).words}
                  displayStartMs={getSegmentWords('primary_scripture', 0).displayStartMs}
                  positionMs={narration.positionMs}
                  isActive={isHighlighted('primary_scripture', 0) && narration.isPlaying}
                  accent={accent}
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 17,
                    lineHeight: 30,
                    color: colors.foreground,
                  }}
                />
              </View>
            )}

            {supportingScriptures.length > 0 && (
              <>
                <View
                  style={{
                    height: 1,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    marginVertical: 16,
                  }}
                />
                {supportingScriptures.map((s, i) => (
                  <View
                    key={s.reference}
                    onLayout={onSectionLayout(segmentIndexFor('supporting_scripture', i))}
                    style={{
                      marginBottom: 12,
                      ...highlightStyle(isHighlighted('supporting_scripture', i)),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'OpenSans_600SemiBold',
                        fontSize: 13,
                        color: accent,
                        marginBottom: 4,
                      }}
                    >
                      {s.reference}
                    </Text>
                    <NarratedText
                      text={s.text}
                      words={getSegmentWords('supporting_scripture', i).words}
                      displayStartMs={getSegmentWords('supporting_scripture', i).displayStartMs}
                      positionMs={narration.positionMs}
                      isActive={isHighlighted('supporting_scripture', i) && narration.isPlaying}
                      accent={accent}
                      style={{
                        fontFamily: 'OpenSans_400Regular',
                        fontSize: 15,
                        lineHeight: 24,
                        color: colors.mutedForeground,
                      }}
                    />
                  </View>
                ))}
              </>
            )}
          </View>

          {/* ═══════ Section 4: Study Content ═══════ */}
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 11,
              color: accent,
              letterSpacing: 1.5,
              marginBottom: 20,
            }}
          >
            STUDY
          </Text>

          {lesson.content.map((paragraph, i) => {
            const hl = isHighlighted('content', i);
            const contentWords = getSegmentWords('content', i);
            const isActiveContent = hl && narration.isPlaying;
            // Drop cap on first paragraph
            if (i === 0) {
              const firstChar = paragraph.charAt(0);
              return (
                <View
                  key={i}
                  onLayout={onSectionLayout(segmentIndexFor('content', i))}
                  style={highlightStyle(hl)}
                >
                  <NarratedText
                    text={paragraph}
                    words={contentWords.words}
                    displayStartMs={contentWords.displayStartMs}
                    positionMs={narration.positionMs}
                    isActive={isActiveContent}
                    accent={accent}
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 17,
                      lineHeight: 30,
                      color: colors.foreground,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 48,
                        lineHeight: 52,
                        color: accent,
                      }}
                    >
                      {firstChar}
                    </Text>
                  </NarratedText>
                </View>
              );
            }
            return (
              <View
                key={i}
                onLayout={onSectionLayout(segmentIndexFor('content', i))}
                style={highlightStyle(hl)}
              >
                <NarratedText
                  text={paragraph}
                  words={contentWords.words}
                  displayStartMs={contentWords.displayStartMs}
                  positionMs={narration.positionMs}
                  isActive={isActiveContent}
                  accent={accent}
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 17,
                    lineHeight: 30,
                    color: colors.foreground,
                    marginBottom: 20,
                  }}
                />
              </View>
            );
          })}

          {/* ═══════ Section 5: Word Study Cards ═══════ */}
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 11,
              color: accent,
              letterSpacing: 1.5,
              marginTop: 16,
              marginBottom: 20,
            }}
          >
            WORD STUDY
          </Text>

          {lesson.wordStudies.map((ws, i) => (
            <View
              key={i}
              onLayout={onSectionLayout(segmentIndexFor('word_study', i))}
              style={{
                backgroundColor: isHighlighted('word_study', i) ? `${accent}15` : colors.card,
                borderRadius: 20,
                padding: 24,
                marginBottom: 16,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isDark ? 0.3 : 0.1,
                    shadowRadius: 12,
                  },
                  android: { elevation: 4 },
                }),
              }}
            >
              {/* Language badge */}
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: `${accent}20`,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 11,
                    color: accent,
                    letterSpacing: 0.5,
                  }}
                >
                  {ws.language}
                </Text>
              </View>

              {/* Original word — hero text */}
              <Text
                style={{
                  fontFamily: 'PlayfairDisplay_700Bold',
                  fontSize: 42,
                  color: accent,
                  marginBottom: 8,
                  ...(ws.language === 'Hebrew' ? { writingDirection: 'rtl', textAlign: 'right' } : {}),
                }}
              >
                {ws.original}
              </Text>

              {/* Transliteration + pronunciation */}
              <Text
                style={{
                  fontFamily: 'OpenSans_600SemiBold',
                  fontSize: 18,
                  color: colors.foreground,
                  marginBottom: 2,
                }}
              >
                {ws.transliteration}
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans_400Regular',
                  fontSize: 14,
                  color: colors.mutedForeground,
                  fontStyle: 'italic',
                  marginBottom: 16,
                }}
              >
                /{ws.pronunciation}/
              </Text>

              {/* Meaning */}
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 14,
                  color: colors.foreground,
                  marginBottom: 8,
                }}
              >
                {ws.meaning}
              </Text>

              {/* Explanation */}
              <NarratedText
                text={ws.explanation}
                words={getSegmentWords('word_study', i).words}
                displayStartMs={getSegmentWords('word_study', i).displayStartMs}
                positionMs={narration.positionMs}
                isActive={isHighlighted('word_study', i) && narration.isPlaying}
                accent={accent}
                style={{
                  fontFamily: 'OpenSans_400Regular',
                  fontSize: 15,
                  lineHeight: 24,
                  color: colors.mutedForeground,
                }}
              />
            </View>
          ))}

          {/* ═══════ Section 6: Key Insight Callout ═══════ */}
          <View
            onLayout={onSectionLayout(segmentIndexFor('key_insight', 0))}
            style={{
              backgroundColor: isHighlighted('key_insight', 0)
                ? `${accent}25`
                : isDark ? `${accent}15` : `${accent}10`,
              borderLeftWidth: 4,
              borderLeftColor: accent,
              borderRadius: 12,
              padding: 20,
              marginTop: 16,
              marginBottom: 36,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Flame size={18} color={accent} />
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 13,
                  color: accent,
                  marginLeft: 8,
                  letterSpacing: 0.5,
                }}
              >
                Key Insight
              </Text>
            </View>
            <NarratedText
              text={lesson.keyInsight}
              words={getSegmentWords('key_insight', 0).words}
              displayStartMs={getSegmentWords('key_insight', 0).displayStartMs}
              positionMs={narration.positionMs}
              isActive={isHighlighted('key_insight', 0) && narration.isPlaying}
              accent={accent}
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 16,
                lineHeight: 26,
                color: colors.foreground,
              }}
            />
          </View>

          {/* ═══════ Section 7: Reflection Questions ═══════ */}
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 11,
              color: accent,
              letterSpacing: 1.5,
              marginBottom: 20,
            }}
          >
            REFLECT
          </Text>

          {lesson.reflectionQuestions.map((q, i) => (
            <View
              key={q.number}
              onLayout={onSectionLayout(segmentIndexFor('reflection_question', i))}
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                ...highlightStyle(isHighlighted('reflection_question', i)),
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: `${accent}20`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                  marginTop: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSans_700Bold',
                    fontSize: 14,
                    color: accent,
                  }}
                >
                  {q.number}
                </Text>
              </View>
              <NarratedText
                text={q.question}
                words={getSegmentWords('reflection_question', i).words}
                displayStartMs={getSegmentWords('reflection_question', i).displayStartMs}
                positionMs={narration.positionMs}
                isActive={isHighlighted('reflection_question', i) && narration.isPlaying}
                accent={accent}
                style={{
                  flex: 1,
                  fontFamily: 'OpenSans_400Regular',
                  fontSize: 16,
                  lineHeight: 26,
                  color: colors.foreground,
                }}
              />
            </View>
          ))}

          {/* ═══════ Section 8: Completion Footer ═══════ */}
          <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 16 }}>
            {/* Flourish */}
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_400Regular',
                fontSize: 24,
                color: colors.mutedForeground,
                letterSpacing: 8,
                marginBottom: 28,
              }}
            >
              · · ·
            </Text>

            {isCompleted ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <CheckCircle size={22} color={accent} />
                  <Text
                    style={{
                      fontFamily: 'OpenSans_600SemiBold',
                      fontSize: 16,
                      color: accent,
                      marginLeft: 8,
                    }}
                  >
                    Lesson Complete
                  </Text>
                </View>
              </>
            ) : (
              <Pressable
                onPress={() => onComplete(lesson.id)}
                style={{ width: '100%' }}
              >
                <LinearGradient
                  colors={study.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                    ...Platform.select({
                      ios: {
                        shadowColor: study.gradient[0],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                      },
                      android: { elevation: 4 },
                    }),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'OpenSans_700Bold',
                      fontSize: 16,
                      color: '#fff',
                    }}
                  >
                    Complete Lesson
                  </Text>
                </LinearGradient>
              </Pressable>
            )}

            {hasNextLesson && (
              <Pressable onPress={onNextLesson} style={{ marginTop: 16 }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 15,
                    color: accent,
                  }}
                >
                  Next Lesson →
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ═══════ Narration Player Bar ═══════ */}
      {narration.isAvailable && (
        <NarrationPlayerBar
          isPlaying={narration.isPlaying}
          overallProgress={narration.overallProgress}
          currentSegmentIndex={narration.currentSegmentIndex}
          totalSegments={narration.totalSegments}
          totalDurationMs={narration.totalDurationMs}
          accent={accent}
          onTogglePlayback={narration.togglePlayback}
          onSkipForward={narration.skipForward}
          onSkipBack={narration.skipBack}
          bottomInset={insets.bottom}
        />
      )}
    </View>
  );
}
