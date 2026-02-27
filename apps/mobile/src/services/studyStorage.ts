import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { StudyProgress } from '../data/bibleStudies';

const KEY_PREFIX = 'study_progress_';

// Web fallback (SecureStore is not available on web)
const memoryStore: Record<string, string> = {};

export const studyStorage = {
  async getProgress(studyId: string): Promise<StudyProgress | null> {
    const key = KEY_PREFIX + studyId;
    const raw =
      Platform.OS === 'web'
        ? memoryStore[key] ?? null
        : await SecureStore.getItemAsync(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StudyProgress;
    } catch {
      return null;
    }
  },

  async saveProgress(progress: StudyProgress): Promise<void> {
    const key = KEY_PREFIX + progress.studyId;
    const value = JSON.stringify(progress);
    if (Platform.OS === 'web') {
      memoryStore[key] = value;
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
};
