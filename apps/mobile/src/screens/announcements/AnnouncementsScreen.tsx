import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function AnnouncementsScreen() {
  // TODO: Phase 1 - fetch and display announcements
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Announcements will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
