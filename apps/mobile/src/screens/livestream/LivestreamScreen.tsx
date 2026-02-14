import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function LivestreamScreen() {
  // TODO: Phase 4 - YouTube embed / custom player
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Livestream coming in Phase 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
