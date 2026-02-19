import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../lib/useTheme';

const ADMIN_ROLES = ['super_admin', 'admin', 'pastor', 'staff'];

// ── Mock data ──────────────────────────────────────────────────────
interface EventItem {
  id: string;
  title: string;
  date: string;      // YYYY-MM-DD
  time: string;
  color: string;
  location: string;
  description: string;
}

const SAMPLE_EVENTS: EventItem[] = [
  { id: '1', title: 'Sunday Worship', date: '2026-02-22', time: '9:00 AM', color: '#e7b008', location: 'Main Sanctuary', description: 'Join us for our weekly Sunday worship service.' },
  { id: '2', title: 'Bible Study', date: '2026-02-18', time: '7:00 PM', color: '#3b82f6', location: 'Fellowship Hall', description: 'Midweek Bible study and prayer.' },
  { id: '3', title: 'Youth Group', date: '2026-02-20', time: '6:30 PM', color: '#f472b6', location: 'Youth Center', description: 'Activities and fellowship for teens.' },
  { id: '4', title: 'Community Potluck', date: '2026-02-28', time: '12:00 PM', color: '#34d399', location: 'Fellowship Hall', description: 'Bring a dish and enjoy community fellowship.' },
  { id: '9', title: 'Choir Rehearsal', date: '2026-02-22', time: '11:00 AM', color: '#3b82f6', location: 'Main Sanctuary', description: 'Weekly choir practice for Sunday service.' },
  { id: '10', title: 'Children\'s Ministry', date: '2026-02-22', time: '9:00 AM', color: '#f472b6', location: 'Children\'s Wing', description: 'Sunday morning program for kids.' },
  { id: '5', title: 'Sunday Worship', date: '2026-03-01', time: '9:00 AM', color: '#e7b008', location: 'Main Sanctuary', description: 'Join us for our weekly Sunday worship service.' },
  { id: '6', title: 'Prayer Meeting', date: '2026-03-04', time: '6:00 PM', color: '#1b294b', location: 'Chapel', description: 'Evening prayer gathering.' },
  { id: '7', title: 'Sunday Worship', date: '2026-03-08', time: '9:00 AM', color: '#e7b008', location: 'Main Sanctuary', description: 'Join us for our weekly Sunday worship service.' },
  { id: '8', title: 'Choir Rehearsal', date: '2026-03-11', time: '7:00 PM', color: '#3b82f6', location: 'Main Sanctuary', description: 'Weekly choir practice for Sunday service.' },
];

// ── Calendar helpers ───────────────────────────────────────────────
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(month: number, year: number): number {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function generateCalendarWeeks(month: number, year: number): (number | null)[][] {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfWeek(month, year);
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = new Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}

function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ── Component ──────────────────────────────────────────────────────
export function EventsScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const today = new Date();
  const isAdmin = user && ADMIN_ROLES.includes(user.globalRole);

  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Listen for new events passed back from AddEventScreen
  useEffect(() => {
    const newEvent = route.params?.newEvent;
    if (newEvent) {
      setEvents((prev) => [...prev, newEvent]);
      navigation.setParams({ newEvent: undefined });
    }
  }, [route.params?.newEvent]);

  const weeks = generateCalendarWeeks(currentMonth, currentYear);

  // Build a map of date → event colors for dots
  const eventsByDate = new Map<string, string[]>();
  events.forEach((e) => {
    const existing = eventsByDate.get(e.date) ?? [];
    existing.push(e.color);
    eventsByDate.set(e.date, existing);
  });

  // Events for the current month
  const monthEvents = events
    .filter((e) => {
      const [y, m] = e.date.split('-').map(Number);
      return y === currentYear && m === currentMonth + 1;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isPast = (day: number) => {
    if (currentYear < today.getFullYear()) return true;
    if (currentYear > today.getFullYear()) return false;
    if (currentMonth < today.getMonth()) return true;
    if (currentMonth > today.getMonth()) return false;
    return day < today.getDate();
  };

  return (
    <View className="flex-1 bg-background">
      {/* ── Navy header ────────────────────────────────── */}
      <View
        className="bg-primary px-5 pb-3"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Text
          style={{
            fontFamily: 'PlayfairDisplay_700Bold',
            fontSize: 26,
            color: '#f8fafc',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Events
        </Text>
        <View className="flex-row items-center justify-between">
          <Pressable onPress={goToPrevMonth} hitSlop={12} className="p-2">
            <ChevronLeft size={24} color={colors.primaryForeground} />
          </Pressable>
          <Text className="font-heading-bold text-xl text-primary-foreground">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </Text>
          <Pressable onPress={goToNextMonth} hitSlop={12} className="p-2">
            <ChevronRight size={24} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Calendar grid ──────────────────────────── */}
        <View className="mx-4 mt-4 bg-card rounded-2xl border border-border p-3">
          {/* Day-of-week labels */}
          <View className="flex-row mb-1">
            {DAY_LABELS.map((label) => (
              <View key={label} className="flex-1 items-center py-1">
                <Text className="font-body-bold text-base text-foreground">
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* Week rows */}
          {weeks.map((week, wi) => (
            <View key={wi} className="flex-row">
              {week.map((day, di) => {
                const dateKey = day ? formatDateKey(currentYear, currentMonth, day) : '';
                const dotColors = day ? eventsByDate.get(dateKey) : undefined;
                const todayHighlight = day !== null && isToday(day);

                return (
                  <View key={di} className="flex-1 items-center py-1">
                    {day !== null ? (
                      <View className="items-center">
                        <View
                          className={`w-8 h-8 items-center justify-center rounded-full ${
                            todayHighlight ? 'bg-accent' : ''
                          }`}
                        >
                          <Text
                            className={`font-body-bold text-base ${
                              todayHighlight
                                ? 'text-accent-foreground'
                                : isPast(day)
                                  ? 'text-muted-foreground'
                                  : 'text-foreground'
                            }`}
                          >
                            {day}
                          </Text>
                        </View>
                        {/* Event dots */}
                        <View className="flex-row gap-0.5 mt-0.5 h-2 items-center">
                          {dotColors?.slice(0, 3).map((c, i) => (
                            <View
                              key={i}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </View>
                      </View>
                    ) : (
                      <View className="h-10" />
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* ── Events list ────────────────────────────── */}
        <View className="px-4 mt-6">
          <Text
            style={{
              fontFamily: 'PlayfairDisplay_700Bold',
              fontSize: 26,
              color: colors.foreground,
              marginBottom: 16,
            }}
          >
            Events this month
          </Text>

          {monthEvents.length === 0 ? (
            <Text className="font-body text-sm text-muted-foreground text-center py-8">
              No events this month
            </Text>
          ) : (
            monthEvents.map((event) => (
              <Pressable
                key={event.id}
                className="flex-row items-center bg-card rounded-xl border border-border mb-3 overflow-hidden active:opacity-80"
                onPress={() => navigation.navigate('EventDetail', { event })}
              >
                {/* Color bar */}
                <View
                  className="w-1.5 self-stretch rounded-l-xl"
                  style={{ backgroundColor: event.color }}
                />
                <View className="flex-1 px-4 py-3">
                  <Text className="font-body-bold text-base text-foreground">
                    {event.title}
                  </Text>
                  <Text className="font-body text-sm text-muted-foreground mt-0.5">
                    {formatDisplayDate(event.date)} · {event.time}
                  </Text>
                </View>
                <ChevronRight size={18} color={colors.mutedForeground} style={{ marginRight: 12 }} />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      {/* Admin FAB */}
      {isAdmin && (
        <Pressable
          onPress={() => navigation.navigate('AddEvent')}
          style={{
            position: 'absolute',
            right: 20,
            bottom: insets.bottom + 104,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              },
              android: { elevation: 8 },
            }),
          }}
          className="active:opacity-80"
        >
          <Plus size={28} color="#ffffff" />
        </Pressable>
      )}
    </View>
  );
}
