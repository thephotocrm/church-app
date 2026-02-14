import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function EventsScreen({ navigation }: any) {
  // TODO: Phase 2 - fetch and display events
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Events will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
