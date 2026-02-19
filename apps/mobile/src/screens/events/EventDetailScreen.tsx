import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Clock, Calendar } from 'lucide-react-native';
import { useTheme } from '../../lib/useTheme';

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function EventDetailScreen({ route }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const event = route.params?.event;

  if (!event) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="font-body text-muted-foreground">Event not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Color banner */}
      <View className="h-3" style={{ backgroundColor: event.color }} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-5">
          {/* Title */}
          <Text className="font-heading-bold text-2xl text-foreground">
            {event.title}
          </Text>

          {/* Meta info */}
          <View className="mt-4 gap-3">
            <View className="flex-row items-center gap-3">
              <Calendar size={18} color={event.color} />
              <Text className="font-body text-base text-foreground">
                {formatDisplayDate(event.date)}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <Clock size={18} color={event.color} />
              <Text className="font-body text-base text-foreground">
                {event.time}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <MapPin size={18} color={event.color} />
              <Text className="font-body text-base text-foreground">
                {event.location}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-border my-5" />

          {/* Description */}
          <Text className="font-body-bold text-lg text-foreground mb-2">
            About this event
          </Text>
          <Text className="font-body text-base text-muted-foreground leading-6">
            {event.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
