import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export function SermonsScreen({ navigation }: any) {
  // TODO: Phase 1 - fetch sermons from API
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Sermons will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
