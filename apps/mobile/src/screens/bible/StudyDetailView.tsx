import React from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Flame, CheckCircle, BookOpen } from 'lucide-react-native';
import { useTheme } from '../../lib/useTheme';
import type { GuidedStudy, StudyLesson, StudyProgress } from '../../data/bibleStudies';

interface Props {
  study: GuidedStudy;
  progress: StudyProgress | null;
  onBack: () => void;
  onLessonPress: (lesson: StudyLesson) => void;
}

export function StudyDetailView({ study, progress, onBack, onLessonPress }: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const completedCount = progress?.completedLessons.length ?? 0;
  const progressPct = study.lessonCount > 0 ? completedCount / study.lessonCount : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <LinearGradient
          colors={study.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 8,
            paddingBottom: 36,
            paddingHorizontal: 20,
          }}
        >
          {/* Back button */}
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <ChevronLeft size={22} color="#f8fafc" />
          </Pressable>

          {/* Icon circle */}
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Flame size={30} color="#fff" />
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 32,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            {study.title}
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: 'OpenSans_400Regular',
              fontSize: 15,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 16,
              lineHeight: 22,
            }}
          >
            {study.description}
          </Text>

          {/* Progress bar */}
          <View
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                height: 4,
                borderRadius: 2,
                backgroundColor: '#fff',
                width: `${progressPct * 100}%`,
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: 'OpenSans_600SemiBold',
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {completedCount} of {study.lessonCount} completed
          </Text>
        </LinearGradient>

        {/* ── Lesson cards ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 28, gap: 20 }}>
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 11,
              color: study.accent,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Your Journey
          </Text>
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 22,
              color: colors.foreground,
              marginBottom: 20,
            }}
          >
            {study.lessonCount} Lessons
          </Text>

          {study.lessons.map((lesson, idx) => {
            const isCompleted = progress?.completedLessons.includes(lesson.id) ?? false;
            const primaryScripture = lesson.scriptures.find((s) => s.isPrimary);
            const isLast = idx === study.lessons.length - 1;

            return (
              <Pressable
                key={lesson.id}
                onPress={() => onLessonPress(lesson)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  marginBottom: 0,
                })}
              >
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    overflow: 'hidden',
                    borderWidth: isCompleted ? 1.5 : 1,
                    borderColor: isCompleted ? `${study.accent}40` : colors.border,
                    ...Platform.select({
                      ios: {
                        shadowColor: isCompleted ? study.accent : '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: isCompleted ? 0.15 : (isDark ? 0.3 : 0.08),
                        shadowRadius: 12,
                      },
                      android: { elevation: isCompleted ? 6 : 3 },
                    }),
                  }}
                >
                  {/* Top accent strip — gradient for incomplete, solid accent for completed */}
                  {isCompleted ? (
                    <View style={{ height: 4, backgroundColor: study.accent }} />
                  ) : (
                    <LinearGradient
                      colors={study.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ height: 4 }}
                    />
                  )}

                  <View style={{ padding: 18 }}>
                    {/* Top row: number badge + completed badge */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 14,
                      }}
                    >
                      {/* Lesson number with gradient background */}
                      <LinearGradient
                        colors={
                          isCompleted
                            ? [study.accent, study.accent]
                            : study.gradient
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} color="#fff" />
                        ) : (
                          <Text
                            style={{
                              fontFamily: 'PlayfairDisplay_700Bold',
                              fontSize: 18,
                              color: '#fff',
                            }}
                          >
                            {lesson.number}
                          </Text>
                        )}
                      </LinearGradient>

                      {/* Lesson label */}
                      <Text
                        style={{
                          fontFamily: 'OpenSans_600SemiBold',
                          fontSize: 11,
                          color: colors.mutedForeground,
                          letterSpacing: 0.8,
                          textTransform: 'uppercase',
                          marginLeft: 12,
                          flex: 1,
                        }}
                      >
                        Lesson {lesson.number}
                      </Text>

                      {/* Completed / arrow badge */}
                      {isCompleted ? (
                        <View
                          style={{
                            backgroundColor: `${study.accent}15`,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'OpenSans_600SemiBold',
                              fontSize: 11,
                              color: study.accent,
                            }}
                          >
                            Completed
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor: isDark ? colors.muted : '#f1f5f9',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronRight size={16} color={colors.mutedForeground} />
                        </View>
                      )}
                    </View>

                    {/* Title */}
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 19,
                        color: colors.foreground,
                        marginBottom: 4,
                      }}
                    >
                      {lesson.title}
                    </Text>

                    {/* Subtitle */}
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: 'OpenSans_400Regular',
                        fontSize: 14,
                        color: colors.mutedForeground,
                        marginBottom: 14,
                      }}
                    >
                      {lesson.subtitle}
                    </Text>

                    {/* Scripture preview chip */}
                    {primaryScripture && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: isDark ? `${study.accent}10` : `${study.accent}08`,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 10,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <BookOpen size={14} color={study.accent} />
                        <Text
                          style={{
                            fontFamily: 'OpenSans_600SemiBold',
                            fontSize: 12,
                            color: study.accent,
                            marginLeft: 6,
                          }}
                        >
                          {primaryScripture.reference}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
