import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function GivingScreen() {
  // TODO: Phase 4 - Stripe checkout, donation history
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Giving coming in Phase 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
