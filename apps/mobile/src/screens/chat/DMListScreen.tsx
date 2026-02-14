import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function DMListScreen({ navigation }: any) {
  // TODO: Phase 3 - list DM conversations
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Direct messages coming in Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
