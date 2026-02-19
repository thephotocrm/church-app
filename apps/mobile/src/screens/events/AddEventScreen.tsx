import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { Input, Button } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

const EVENT_COLORS = [
  { label: 'Gold', value: '#e7b008' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Pink', value: '#f472b6' },
  { label: 'Green', value: '#34d399' },
  { label: 'Navy', value: '#1b294b' },
  { label: 'Coral', value: '#f87171' },
];

export function AddEventScreen({ navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(EVENT_COLORS[0].value);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter an event title.');
      return;
    }
    // Validate date format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert('Invalid Date', 'Please enter a date in YYYY-MM-DD format.');
      return;
    }
    if (!time.trim()) {
      Alert.alert('Required', 'Please enter a time.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      description: description.trim(),
      color,
    };

    navigation.navigate('EventsList', { newEvent });
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="px-5 pt-4">
        <Input
          label="Event Title"
          placeholder="e.g. Sunday Worship"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          keyboardType="numbers-and-punctuation"
        />
        <Input
          label="Time"
          placeholder="e.g. 9:00 AM"
          value={time}
          onChangeText={setTime}
        />
        <Input
          label="Location"
          placeholder="e.g. Main Sanctuary"
          value={location}
          onChangeText={setLocation}
        />
        <Input
          label="Description"
          placeholder="Describe the event..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          className="min-h-[100px] py-3"
          style={{ textAlignVertical: 'top' }}
        />

        {/* Color picker */}
        <Text className="font-body-semibold text-sm text-foreground mb-2">
          Event Color
        </Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          {EVENT_COLORS.map((c) => (
            <Pressable
              key={c.value}
              onPress={() => setColor(c.value)}
              className="items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                backgroundColor: c.value,
                borderWidth: color === c.value ? 3 : 0,
                borderColor: colors.foreground,
              }}
            >
              {color === c.value && <Check size={20} color="#ffffff" />}
            </Pressable>
          ))}
        </View>

        <Button onPress={handleSave}>Create Event</Button>
      </View>
    </ScrollView>
  );
}
