import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SermonDetailScreen({ route }: any) {
  // TODO: Phase 1 - display sermon details, audio/video player
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Sermon detail view</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
