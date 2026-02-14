import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function EventDetailScreen({ route }: any) {
  // TODO: Phase 2 - event details + RSVP
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Event detail view</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
