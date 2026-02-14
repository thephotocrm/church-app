import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function GroupChatScreen({ route }: any) {
  // TODO: Phase 3 - real-time group chat
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Group chat coming in Phase 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  placeholder: { fontSize: 16, color: '#9ca3af' },
});
