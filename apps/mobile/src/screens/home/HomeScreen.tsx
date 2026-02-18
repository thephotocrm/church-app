import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useStreamStatus } from '../../hooks/useStreamStatus';

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { status } = useStreamStatus();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Welcome, {user?.name?.split(' ')[0]}</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Livestream')}>
        <View style={styles.cardRow}>
          <Text style={styles.cardTitle}>Watch Live</Text>
          {status?.isLive && (
            <View style={styles.liveDot}>
              <Text style={styles.liveDotText}>LIVE</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardSub}>
          {status?.isLive ? status.title : 'Join the livestream'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Announcements')}>
        <Text style={styles.cardTitle}>Announcements</Text>
        <Text style={styles.cardSub}>Latest updates from the church</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.getParent()?.navigate('Sermons')}
      >
        <Text style={styles.cardTitle}>Sermons</Text>
        <Text style={styles.cardSub}>Watch or listen to past messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.getParent()?.navigate('Events')}
      >
        <Text style={styles.cardTitle}>Events</Text>
        <Text style={styles.cardSub}>See what's coming up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  greeting: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 8 },
  card: {
    backgroundColor: '#fff', padding: 20, borderRadius: 12,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardSub: { fontSize: 14, color: '#6b7280' },
  liveDot: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  liveDotText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
});
