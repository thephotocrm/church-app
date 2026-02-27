import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Animated,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  List,
  Flame,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../lib/useTheme';
import BIBLE_COVER_IMAGES from '../../assets/bibleCoverImages';
import {
  getBooks,
  getChapters,
  getChapterContent,
  BibleBook,
  BibleChapter,
  ChapterContent,
} from '../../services/bibleApi';
import {
  GUIDED_STUDIES,
  type GuidedStudy,
  type StudyLesson,
  type StudyProgress,
} from '../../data/bibleStudies';
import { studyStorage } from '../../services/studyStorage';
import { StudyDetailView } from './StudyDetailView';
import { StudyLessonView } from './StudyLessonView';

// ── Constants ──────────────────────────────────────────────
const NT_FIRST_BOOK = 'MAT';

// Book categories for visual grouping
const OT_CATEGORIES: { label: string; bookIds: string[] }[] = [
  { label: 'Law', bookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU'] },
  { label: 'History', bookIds: ['JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST'] },
  { label: 'Poetry & Wisdom', bookIds: ['JOB', 'PSA', 'PRO', 'ECC', 'SNG'] },
  { label: 'Major Prophets', bookIds: ['ISA', 'JER', 'LAM', 'EZK', 'DAN'] },
  { label: 'Minor Prophets', bookIds: ['HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'] },
];

const NT_CATEGORIES: { label: string; bookIds: string[] }[] = [
  { label: 'Gospels', bookIds: ['MAT', 'MRK', 'LUK', 'JHN'] },
  { label: 'History', bookIds: ['ACT'] },
  { label: "Paul's Letters", bookIds: ['ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM'] },
  { label: 'General Letters', bookIds: ['HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD'] },
  { label: 'Prophecy', bookIds: ['REV'] },
];

// Category color map — gradient pairs for book cover thumbnails + accent for dots/text
const CATEGORY_COLORS: Record<string, { gradient: [string, string]; accent: string }> = {
  'Law':              { gradient: ['#1e3a8a', '#3b82f6'], accent: '#3b82f6' },
  'History':          { gradient: ['#064e3b', '#10b981'], accent: '#10b981' },
  'Poetry & Wisdom':  { gradient: ['#78350f', '#f59e0b'], accent: '#f59e0b' },
  'Major Prophets':   { gradient: ['#4c1d95', '#8b5cf6'], accent: '#8b5cf6' },
  'Minor Prophets':   { gradient: ['#881337', '#f43f5e'], accent: '#f43f5e' },
  'Gospels':          { gradient: ['#713f12', '#eab308'], accent: '#eab308' },
  "Paul's Letters":   { gradient: ['#1e3a8a', '#60a5fa'], accent: '#3b82f6' },
  'General Letters':  { gradient: ['#134e4a', '#14b8a6'], accent: '#14b8a6' },
  'Prophecy':         { gradient: ['#4c1d95', '#a78bfa'], accent: '#8b5cf6' },
};

// Helper to find a book's category label
function getBookCategory(bookId: string): string {
  for (const cat of [...OT_CATEGORIES, ...NT_CATEGORIES]) {
    if (cat.bookIds.includes(bookId)) return cat.label;
  }
  return 'History';
}

// Chapter counts for all 66 books (static, well-known data)
const BOOK_CHAPTERS: Record<string, number> = {
  GEN: 50, EXO: 40, LEV: 27, NUM: 36, DEU: 34,
  JOS: 24, JDG: 21, RUT: 4, '1SA': 31, '2SA': 24,
  '1KI': 22, '2KI': 25, '1CH': 29, '2CH': 36, EZR: 10,
  NEH: 13, EST: 10, JOB: 42, PSA: 150, PRO: 31,
  ECC: 12, SNG: 8, ISA: 66, JER: 52, LAM: 5,
  EZK: 48, DAN: 12, HOS: 14, JOL: 3, AMO: 9,
  OBA: 1, JON: 4, MIC: 7, NAM: 3, HAB: 3,
  ZEP: 3, HAG: 2, ZEC: 14, MAL: 4,
  MAT: 28, MRK: 16, LUK: 24, JHN: 21, ACT: 28,
  ROM: 16, '1CO': 16, '2CO': 13, GAL: 6, EPH: 6,
  PHP: 4, COL: 4, '1TH': 5, '2TH': 3, '1TI': 6,
  '2TI': 4, TIT: 3, PHM: 1, HEB: 13, JAS: 5,
  '1PE': 5, '2PE': 3, '1JN': 5, '2JN': 1, '3JN': 1,
  JUD: 1, REV: 22,
};

type ViewState = 'books' | 'chapters' | 'reading' | 'study-detail' | 'lesson';

// ── Verse parsing ──────────────────────────────────────────
interface VersePart {
  type: 'number' | 'text';
  value: string;
}

function parseVerses(raw: string): VersePart[] {
  const parts: VersePart[] = [];
  // Match [1], [2], etc. and split around them
  const regex = /\[(\d+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    // Text before this verse number
    if (match.index > lastIndex) {
      const text = raw.slice(lastIndex, match.index).trim();
      if (text) parts.push({ type: 'text', value: text + ' ' });
    }
    parts.push({ type: 'number', value: match[1] });
    lastIndex = regex.lastIndex;
  }

  // Remaining text after last verse number
  if (lastIndex < raw.length) {
    const text = raw.slice(lastIndex).trim();
    if (text) parts.push({ type: 'text', value: text });
  }

  return parts;
}

// ── Main Component ─────────────────────────────────────────
export function BibleScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();

  const [view, setView] = useState<ViewState>('books');
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [chapters, setChapters] = useState<BibleChapter[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [chapterData, setChapterData] = useState<ChapterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track last read for "Continue Reading"
  const [lastRead, setLastRead] = useState<{
    book: BibleBook;
    chapterId: string;
    reference: string;
  } | null>(null);

  // ── Guided Studies state ──
  const [selectedStudy, setSelectedStudy] = useState<GuidedStudy | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<StudyLesson | null>(null);
  const [studyProgress, setStudyProgress] = useState<StudyProgress | null>(null);
  const [allStudyProgress, setAllStudyProgress] = useState<Record<string, StudyProgress>>({});

  const scrollRef = useRef<ScrollView>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Hide tab bar in immersive views (lesson / reading) ──
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (view === 'lesson' || view === 'reading') {
      parent?.setOptions({ tabBarStyle: { display: 'none' as const } });
    } else {
      parent?.setOptions({ tabBarStyle: undefined });
    }
  }, [view, navigation]);

  useEffect(() => {
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);

  // ── Testament toggle ──
  const [activeTestament, setActiveTestament] = useState<'OT' | 'NT'>('OT');
  const pillAnim = useRef(new Animated.Value(0)).current;

  const switchTestament = useCallback((testament: 'OT' | 'NT') => {
    setActiveTestament(testament);
    Animated.spring(pillAnim, {
      toValue: testament === 'OT' ? 0 : 1,
      useNativeDriver: false,
      friction: 9,
      tension: 80,
    }).start();
  }, [pillAnim]);

  // ── Build book lookup map ──
  const bookMap = useMemo(() => {
    const map = new Map<string, BibleBook>();
    books.forEach((b) => map.set(b.id, b));
    return map;
  }, [books]);

  // ── Load books on mount ──
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch {
      setError('Unable to load books. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBookPress = useCallback(async (book: BibleBook) => {
    setSelectedBook(book);
    setLoading(true);
    setError(null);
    try {
      const data = await getChapters(book.id);
      setChapters(data.filter((c) => c.number !== 'intro'));
      setView('chapters');
    } catch {
      setError('Unable to load chapters. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChapterPress = useCallback(
    async (chapter: BibleChapter) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapterContent(chapter.id);
        if (!data || !data.content) {
          throw new Error('Chapter content is empty');
        }
        setChapterData(data);
        setView('reading');
        if (selectedBook) {
          setLastRead({
            book: selectedBook,
            chapterId: chapter.id,
            reference: data.reference,
          });
        }
        setScrollProgress(0);
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      } catch (err) {
        console.error('handleChapterPress error:', err);
        setError('Unable to load this chapter. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [selectedBook],
  );

  const handlePrevNext = useCallback(
    async (chapterId: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapterContent(chapterId);
        if (!data || !data.content) {
          throw new Error('Chapter content is empty');
        }
        setChapterData(data);
        if (selectedBook) {
          setLastRead({
            book: selectedBook,
            chapterId,
            reference: data.reference,
          });
        }
        setScrollProgress(0);
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      } catch {
        setError('Unable to load chapter. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [selectedBook],
  );

  const handleBack = useCallback(() => {
    if (view === 'lesson') {
      setView('study-detail');
      setSelectedLesson(null);
    } else if (view === 'study-detail') {
      setView('books');
      setSelectedStudy(null);
      setStudyProgress(null);
    } else if (view === 'reading') {
      setView('chapters');
      setChapterData(null);
    } else if (view === 'chapters') {
      setView('books');
      setSelectedBook(null);
      setChapters([]);
    } else {
      navigation.goBack();
    }
  }, [view, navigation]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      const maxScroll = contentSize.height - layoutMeasurement.height;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(Math.max(contentOffset.y / maxScroll, 0), 1));
      }
    },
    [],
  );

  const handleContinueReading = useCallback(async () => {
    if (!lastRead) return;
    setSelectedBook(lastRead.book);
    setLoading(true);
    setError(null);
    try {
      // Load chapters for the book first
      const chapData = await getChapters(lastRead.book.id);
      setChapters(chapData.filter((c) => c.number !== 'intro'));
      // Then load the chapter content
      const content = await getChapterContent(lastRead.chapterId);
      if (!content || !content.content) {
        throw new Error('Chapter content is empty');
      }
      setChapterData(content);
      setView('reading');
      setScrollProgress(0);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    } catch {
      setError('Unable to resume reading. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [lastRead]);

  // ── Load study progress on mount ──
  useEffect(() => {
    (async () => {
      const progressMap: Record<string, StudyProgress> = {};
      for (const s of GUIDED_STUDIES) {
        const p = await studyStorage.getProgress(s.id);
        if (p) progressMap[s.id] = p;
      }
      setAllStudyProgress(progressMap);
    })();
  }, []);

  // ── Study handlers ──
  const handleStudyPress = useCallback(async (study: GuidedStudy) => {
    const progress = await studyStorage.getProgress(study.id);
    setStudyProgress(progress);
    setSelectedStudy(study);
    setView('study-detail');
  }, []);

  const handleLessonPress = useCallback((lesson: StudyLesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  }, []);

  const handleLessonComplete = useCallback(async (lessonId: string) => {
    if (!selectedStudy) return;
    const current = studyProgress ?? {
      studyId: selectedStudy.id,
      completedLessons: [],
      lastAccessedLessonId: null,
    };
    if (!current.completedLessons.includes(lessonId)) {
      current.completedLessons = [...current.completedLessons, lessonId];
    }
    current.lastAccessedLessonId = lessonId;
    setStudyProgress({ ...current });
    setAllStudyProgress((prev) => ({ ...prev, [selectedStudy.id]: { ...current } }));
    await studyStorage.saveProgress(current);
  }, [selectedStudy, studyProgress]);

  const handleNextLesson = useCallback(() => {
    if (!selectedStudy || !selectedLesson) return;
    const idx = selectedStudy.lessons.findIndex((l) => l.id === selectedLesson.id);
    if (idx >= 0 && idx < selectedStudy.lessons.length - 1) {
      setSelectedLesson(selectedStudy.lessons[idx + 1]);
    } else {
      setView('study-detail');
      setSelectedLesson(null);
    }
  }, [selectedStudy, selectedLesson]);

  // ── Pre-compute reading view data (must be above all returns) ──
  const verseParts = useMemo(
    () => parseVerses(chapterData?.content ?? ''),
    [chapterData?.content],
  );

  // ── Shared header ──
  function Header({
    title,
    subtitle,
    showBack,
    rightIcon,
  }: {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    rightIcon?: React.ReactNode;
  }) {
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: insets.top + 8,
          paddingBottom: 18,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showBack && (
            <Pressable
              onPress={handleBack}
              hitSlop={12}
              style={{
                marginRight: 12,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronLeft size={22} color="#f8fafc" />
            </Pressable>
          )}
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                fontSize: 28,
                color: '#f8fafc',
              }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontFamily: 'OpenSans_400Regular',
                  fontSize: 13,
                  color: colors.accent,
                  marginTop: 2,
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
          {rightIcon && (
            <View style={{ marginLeft: 12, opacity: 0.4 }}>{rightIcon}</View>
          )}
        </View>
      </View>
    );
  }

  // ══════════════════════════════════════════════════════════
  // STUDY LESSON VIEW
  // ══════════════════════════════════════════════════════════
  if (view === 'lesson' && selectedStudy && selectedLesson) {
    const isCompleted = studyProgress?.completedLessons.includes(selectedLesson.id) ?? false;
    const lessonIdx = selectedStudy.lessons.findIndex((l) => l.id === selectedLesson.id);
    const hasNext = lessonIdx >= 0 && lessonIdx < selectedStudy.lessons.length - 1;
    return (
      <StudyLessonView
        study={selectedStudy}
        lesson={selectedLesson}
        isCompleted={isCompleted}
        hasNextLesson={hasNext}
        onBack={handleBack}
        onComplete={handleLessonComplete}
        onNextLesson={handleNextLesson}
      />
    );
  }

  // ══════════════════════════════════════════════════════════
  // STUDY DETAIL VIEW
  // ══════════════════════════════════════════════════════════
  if (view === 'study-detail' && selectedStudy) {
    return (
      <StudyDetailView
        study={selectedStudy}
        progress={studyProgress}
        onBack={handleBack}
        onLessonPress={handleLessonPress}
      />
    );
  }

  // ── Error + retry state ──
  if (error && !loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header
          title={
            view === 'books'
              ? 'Bible'
              : view === 'chapters'
                ? selectedBook?.name ?? 'Bible'
                : chapterData?.reference ?? 'Bible'
          }
          showBack={view !== 'books'}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.muted,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <RotateCcw size={28} color={colors.mutedForeground} />
          </View>
          <Text
            style={{
              fontFamily: 'OpenSans_600SemiBold',
              fontSize: 17,
              color: colors.foreground,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Something went wrong
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 14,
              color: colors.mutedForeground,
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 20,
            }}
          >
            {error}
          </Text>
          <Pressable
            onPress={() => {
              if (view === 'books') loadBooks();
              else if (view === 'chapters' && selectedBook) handleBookPress(selectedBook);
              else if (view === 'reading' && chapterData) handlePrevNext(chapterData.id);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.accent,
              paddingHorizontal: 28,
              paddingVertical: 14,
              borderRadius: 24,
              ...Platform.select({
                ios: {
                  shadowColor: colors.accent,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                },
                android: { elevation: 4 },
              }),
            }}
          >
            <RotateCcw size={16} color="#fff" />
            <Text
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 15,
                color: '#fff',
                marginLeft: 8,
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ══════════════════════════════════════════════════════════
  // BOOKS VIEW
  // ══════════════════════════════════════════════════════════
  if (view === 'books') {
    const categories = activeTestament === 'OT' ? OT_CATEGORIES : NT_CATEGORIES;

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header
          title="Bible"
          subtitle="King James Version"
          showBack
          rightIcon={<BookOpen size={28} color="#f8fafc" />}
        />
        {loading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 8,
              paddingBottom: insets.bottom + 96,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* ── Continue Reading card ── */}
            {lastRead && (
              <Pressable
                onPress={handleContinueReading}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  padding: 18,
                  marginBottom: 20,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Platform.select({
                    ios: {
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                    },
                    android: { elevation: 4 },
                  }),
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                  }}
                >
                  <BookOpen size={22} color={colors.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: 2,
                    }}
                  >
                    Continue Reading
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'OpenSans_700Bold',
                      fontSize: 17,
                      color: '#f8fafc',
                    }}
                  >
                    {lastRead.reference}
                  </Text>
                </View>
                <ChevronRight size={20} color="rgba(255,255,255,0.4)" />
              </Pressable>
            )}

            {/* ── Guided Studies horizontal section ── */}
            <View style={{ marginTop: lastRead ? 4 : 12, marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 11,
                  color: colors.accent,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                Guided Studies
              </Text>
              <Text
                style={{
                  fontFamily: 'PlayfairDisplay_700Bold',
                  fontSize: 20,
                  color: colors.foreground,
                  marginBottom: 14,
                }}
              >
                Go Deeper
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
                style={{ marginHorizontal: -20, paddingLeft: 20 }}
              >
                {GUIDED_STUDIES.map((study) => {
                  const prog = allStudyProgress[study.id];
                  const completed = prog?.completedLessons.length ?? 0;
                  const pct = study.lessonCount > 0 ? completed / study.lessonCount : 0;
                  return (
                    <Pressable
                      key={study.id}
                      onPress={() => handleStudyPress(study)}
                      style={{ marginRight: 14 }}
                    >
                      <LinearGradient
                        colors={study.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          width: 260,
                          height: 210,
                          borderRadius: 20,
                          padding: 20,
                          ...Platform.select({
                            ios: {
                              shadowColor: study.gradient[0],
                              shadowOffset: { width: 0, height: 6 },
                              shadowOpacity: 0.3,
                              shadowRadius: 12,
                            },
                            android: { elevation: 6 },
                          }),
                        }}
                      >
                        {/* Flame icon in circle */}
                        <View
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 14,
                          }}
                        >
                          <Flame size={22} color="#fff" />
                        </View>

                        {/* Title */}
                        <Text
                          numberOfLines={1}
                          style={{
                            fontFamily: 'PlayfairDisplay_700Bold',
                            fontSize: 20,
                            color: '#fff',
                            marginBottom: 4,
                          }}
                        >
                          {study.title}
                        </Text>

                        {/* Subtitle */}
                        <Text
                          numberOfLines={2}
                          style={{
                            fontFamily: 'OpenSans_400Regular',
                            fontSize: 13,
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 18,
                          }}
                        >
                          {study.subtitle}
                        </Text>

                        {/* Spacer to push progress to bottom */}
                        <View style={{ flex: 1, minHeight: 16 }} />

                        {/* Progress bar */}
                        <View
                          style={{
                            height: 3,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            marginBottom: 8,
                          }}
                        >
                          <View
                            style={{
                              height: 3,
                              borderRadius: 2,
                              backgroundColor: '#fff',
                              width: `${pct * 100}%`,
                            }}
                          />
                        </View>

                        {/* Lessons count */}
                        <Text
                          style={{
                            fontFamily: 'OpenSans_600SemiBold',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          {completed} of {study.lessonCount} lessons
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* ── OT / NT Segmented Control ── */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.muted,
                borderRadius: 16,
                padding: 4,
                marginTop: 8,
                marginBottom: 24,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              {/* Animated sliding pill */}
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 4,
                  bottom: 4,
                  left: 4,
                  width: '50%',
                  transform: [
                    {
                      translateX: pillAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, (screenWidth - 48) / 2],
                      }),
                    },
                  ],
                  backgroundColor: colors.card,
                  borderRadius: 13,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.12,
                      shadowRadius: 6,
                    },
                    android: { elevation: 3 },
                  }),
                }}
              />
              {/* OT Button */}
              <Pressable
                onPress={() => switchTestament('OT')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: activeTestament === 'OT' ? 'OpenSans_700Bold' : 'OpenSans_600SemiBold',
                    fontSize: 14,
                    color: activeTestament === 'OT' ? colors.foreground : colors.mutedForeground,
                  }}
                >
                  Old Testament
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 11,
                    color: colors.mutedForeground,
                    marginTop: 1,
                  }}
                >
                  39 Books
                </Text>
              </Pressable>
              {/* NT Button */}
              <Pressable
                onPress={() => switchTestament('NT')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: activeTestament === 'NT' ? 'OpenSans_700Bold' : 'OpenSans_600SemiBold',
                    fontSize: 14,
                    color: activeTestament === 'NT' ? colors.foreground : colors.mutedForeground,
                  }}
                >
                  New Testament
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 11,
                    color: colors.mutedForeground,
                    marginTop: 1,
                  }}
                >
                  27 Books
                </Text>
              </Pressable>
            </View>

            {/* ── Categorized book list ── */}
            {categories.map((cat, catIndex) => {
              const catColor = CATEGORY_COLORS[cat.label] ?? CATEGORY_COLORS['History'];

              return (
                <View key={cat.label}>
                  {/* Section header */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: catIndex === 0 ? 8 : 20,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: catColor.accent,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'OpenSans_700Bold',
                        fontSize: 13,
                        color: colors.mutedForeground,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {cat.label}
                    </Text>
                  </View>

                  {/* Book list */}
                  {cat.bookIds.map((bookId) => {
                    const book = bookMap.get(bookId);
                    if (!book) return null;
                    const chapterCount = BOOK_CHAPTERS[book.id];
                    return (
                      <Pressable
                        key={book.id}
                        onPress={() => handleBookPress(book)}
                        style={({ pressed }) => ({
                          backgroundColor: pressed ? colors.muted : 'transparent',
                          borderRadius: 16,
                        })}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                          {/* Book cover poster */}
                          {BIBLE_COVER_IMAGES[book.id] ? (
                            <Image
                              source={BIBLE_COVER_IMAGES[book.id]}
                              style={{
                                width: 92,
                                height: 128,
                                borderRadius: 12,
                                marginRight: 16,
                              }}
                              resizeMode="cover"
                            />
                          ) : (
                            <LinearGradient
                              colors={catColor.gradient}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={{
                                width: 92,
                                height: 128,
                                borderRadius: 12,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 16,
                              }}
                            >
                              <BookOpen size={20} color="rgba(255,255,255,0.3)" style={{ marginBottom: 4 }} />
                              <Text
                                style={{
                                  fontFamily: 'PlayfairDisplay_700Bold',
                                  fontSize: 18,
                                  color: '#fff',
                                  letterSpacing: 0.5,
                                }}
                              >
                                {book.abbreviation}
                              </Text>
                            </LinearGradient>
                          )}

                          {/* Title + subtitle */}
                          <View style={{ flex: 1 }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontFamily: 'OpenSans_700Bold',
                                fontSize: 18,
                                color: colors.foreground,
                              }}
                            >
                              {book.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'OpenSans_400Regular',
                                fontSize: 13,
                                color: colors.mutedForeground,
                                marginTop: 4,
                              }}
                            >
                              {cat.label}{chapterCount != null && ` · ${chapterCount} chapters`}
                            </Text>
                          </View>

                          {/* Chapter count badge */}
                          {chapterCount != null && (
                            <View
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                backgroundColor: colors.muted,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'OpenSans_700Bold',
                                  fontSize: 15,
                                  color: colors.foreground,
                                  lineHeight: 18,
                                }}
                              >
                                {chapterCount}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'OpenSans_400Regular',
                                  fontSize: 10,
                                  color: colors.mutedForeground,
                                  lineHeight: 12,
                                }}
                              >
                                ch.
                              </Text>
                            </View>
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }

  // ══════════════════════════════════════════════════════════
  // CHAPTERS VIEW
  // ══════════════════════════════════════════════════════════
  if (view === 'chapters') {
    const COLS = 5;
    const GAP = 10;
    const HORIZONTAL_PAD = 20;
    const cellSize = (screenWidth - HORIZONTAL_PAD * 2 - GAP * (COLS - 1)) / COLS;

    const bookId = selectedBook?.id ?? '';
    const category = getBookCategory(bookId);
    const catColor = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['History'];
    const totalChapters = chapters.length;

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Transparent status bar area */}
        <View style={{ height: insets.top, backgroundColor: catColor.gradient[0] }} />

        {loading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={catColor.accent} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
            showsVerticalScrollIndicator={false}
          >
            {/* ── Hero Banner ── */}
            <LinearGradient
              colors={[catColor.gradient[0], isDark ? colors.background : `${catColor.gradient[1]}22`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ paddingBottom: 24, paddingHorizontal: HORIZONTAL_PAD }}
            >
              {/* Back button */}
              <Pressable
                onPress={handleBack}
                hitSlop={12}
                style={{
                  marginTop: 8,
                  marginBottom: 16,
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

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Book cover */}
                {BIBLE_COVER_IMAGES[bookId] ? (
                  <Image
                    source={BIBLE_COVER_IMAGES[bookId]}
                    style={{
                      width: 120,
                      height: 168,
                      borderRadius: 16,
                      marginRight: 20,
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.3,
                          shadowRadius: 12,
                        },
                        android: { elevation: 8 },
                      }),
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <LinearGradient
                    colors={catColor.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 120,
                      height: 168,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 20,
                    }}
                  >
                    <BookOpen size={28} color="rgba(255,255,255,0.3)" style={{ marginBottom: 6 }} />
                    <Text
                      style={{
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 22,
                        color: '#fff',
                      }}
                    >
                      {selectedBook?.abbreviation}
                    </Text>
                  </LinearGradient>
                )}

                {/* Book info */}
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'PlayfairDisplay_700Bold',
                      fontSize: 26,
                      color: '#f8fafc',
                      marginBottom: 8,
                    }}
                  >
                    {selectedBook?.name}
                  </Text>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: `${catColor.accent}33`,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'OpenSans_600SemiBold',
                        fontSize: 12,
                        color: catColor.accent,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      {category}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'OpenSans_400Regular',
                      fontSize: 14,
                      color: 'rgba(248,250,252,0.7)',
                    }}
                  >
                    {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* ── Chapter Grid ── */}
            <View
              style={{
                paddingHorizontal: HORIZONTAL_PAD,
                paddingTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: GAP,
              }}
            >
              {chapters.map((ch) => (
                <Pressable
                  key={ch.id}
                  onPress={() => handleChapterPress(ch)}
                >
                  <View
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isDark ? '#334155' : '#d1d5db',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.12,
                          shadowRadius: 4,
                        },
                        android: { elevation: 3 },
                      }),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 22,
                        color: isDark ? '#e2e8f0' : '#1e293b',
                      }}
                    >
                      {ch.number}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  // ══════════════════════════════════════════════════════════
  // READING VIEW
  // ══════════════════════════════════════════════════════════

  // Category accent color for the selected book
  const categoryLabel = selectedBook ? getBookCategory(selectedBook.id) : 'History';
  const categoryAccent = CATEGORY_COLORS[categoryLabel]?.accent ?? colors.accent;

  // Parse chapter number from reference (e.g., "Genesis 3" → "3")
  const chapterNumber = chapterData?.reference?.match(/\d+$/)?.[0] ?? '';
  const totalChapters = selectedBook ? BOOK_CHAPTERS[selectedBook.id] ?? 1 : 1;

  // Render verse content with drop cap for first verse
  const renderVerseContent = () => {
    let firstTextRendered = false;

    return (
      <Text
        style={{
          fontFamily: 'OpenSans_400Regular',
          fontSize: 19,
          lineHeight: 34,
          color: colors.foreground,
          letterSpacing: 0.2,
        }}
      >
        {verseParts.map((part, i) => {
          if (part.type === 'number') {
            // Hide verse 1 number (drop cap replaces it visually)
            if (part.value === '1' && !firstTextRendered) {
              return null;
            }
            return (
              <Text
                key={i}
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 11,
                  color: categoryAccent,
                  lineHeight: 20,
                }}
              >
                {part.value}{' '}
              </Text>
            );
          }

          // Clean pilcrow marks — add indent after paragraph breaks
          const cleaned = part.value.replace(/¶\s*/g, '\n\n    ');

          if (!firstTextRendered) {
            firstTextRendered = true;
            const firstChar = cleaned.charAt(0);
            const rest = cleaned.slice(1);
            return (
              <Text key={i}>
                <Text
                  style={{
                    fontFamily: 'PlayfairDisplay_700Bold',
                    fontSize: 48,
                    lineHeight: 52,
                    color: categoryAccent,
                  }}
                >
                  {firstChar}
                </Text>
                {rest}
              </Text>
            );
          }

          return <Text key={i}>{cleaned}</Text>;
        })}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Reading progress bar */}
      <View
        style={{
          position: 'absolute',
          top: insets.top,
          left: 0,
          right: 0,
          zIndex: 20,
          height: 3,
        }}
      >
        <View
          style={{
            height: 3,
            width: `${scrollProgress * 100}%`,
            backgroundColor: categoryAccent,
          }}
        />
      </View>

      {/* Slim translucent top bar */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: insets.top + 10,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: colors.background + 'F2',
          borderBottomWidth: 0.5,
          borderBottomColor: colors.border + '40',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable onPress={handleBack} hitSlop={12} style={{ padding: 4 }}>
          <ChevronLeft size={22} color={colors.foreground} />
        </Pressable>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'OpenSans_600SemiBold',
            fontSize: 16,
            color: colors.foreground,
          }}
        >
          {chapterData?.reference ?? ''}
        </Text>
        <Pressable onPress={handleBack} hitSlop={12} style={{ padding: 4 }}>
          <List size={22} color={colors.foreground} />
        </Pressable>
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 100,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {/* Chapter opener hero */}
          <View style={{ alignItems: 'center', marginBottom: 32, marginTop: 8 }}>
            <Text
              style={{
                fontFamily: 'OpenSans_600SemiBold',
                fontSize: 12,
                color: colors.mutedForeground,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {selectedBook?.name}
            </Text>
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                fontSize: 48,
                color: categoryAccent,
                marginBottom: 12,
              }}
            >
              {chapterNumber}
            </Text>
            <View
              style={{
                width: 40,
                height: 2,
                backgroundColor: categoryAccent,
                opacity: 0.4,
              }}
            />
          </View>

          {/* Verse text with drop cap and superscript numbers */}
          {renderVerseContent()}

          {/* End-of-chapter flourish */}
          <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 14,
                color: colors.mutedForeground,
                letterSpacing: 6,
              }}
            >
              ···
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 12,
                color: colors.mutedForeground,
                marginTop: 8,
                opacity: 0.6,
              }}
            >
              End of {chapterData?.reference}
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Floating bottom navigation bar */}
      {!loading && (
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 16,
              marginBottom: insets.bottom + 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderRadius: 20,
              backgroundColor: colors.card + 'F2',
              borderWidth: 1,
              borderColor: colors.border,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                },
                android: { elevation: 4 },
              }),
            }}
          >
            {chapterData?.previous ? (
              <Pressable
                onPress={() =>
                  chapterData?.previous?.id &&
                  handlePrevNext(chapterData.previous.id)
                }
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <ChevronLeft size={18} color={categoryAccent} />
                <Text
                  style={{
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 14,
                    color: colors.foreground,
                    marginLeft: 4,
                  }}
                >
                  Prev
                </Text>
              </Pressable>
            ) : (
              <View style={{ width: 60 }} />
            )}
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 13,
                color: colors.mutedForeground,
              }}
            >
              Chapter {chapterNumber} of {totalChapters}
            </Text>
            {chapterData?.next ? (
              <Pressable
                onPress={() =>
                  chapterData?.next?.id &&
                  handlePrevNext(chapterData.next.id)
                }
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSans_600SemiBold',
                    fontSize: 14,
                    color: colors.foreground,
                    marginRight: 4,
                  }}
                >
                  Next
                </Text>
                <ChevronRight size={18} color={categoryAccent} />
              </Pressable>
            ) : (
              <View style={{ width: 60 }} />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
