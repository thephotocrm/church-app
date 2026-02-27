import { STREAM_API_URL } from './api';

export interface PrayerRequest {
  id: string;
  authorName: string | null;
  isAnonymous: boolean;
  title: string;
  body: string;
  isPublic: boolean;
  prayerCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrayerRequestPayload {
  title: string;
  body: string;
  authorName: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

async function prayerFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${STREAM_API_URL}/api/prayer-requests${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errBody = await res.text();
    let parsed: any = {};
    try { parsed = JSON.parse(errBody); } catch {}
    throw new Error(parsed.message || parsed.error || `Request failed: ${res.status}`);
  }

  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export async function getPrayerRequests(
  limit = 20,
  offset = 0,
): Promise<PrayerRequest[]> {
  return prayerFetch<PrayerRequest[]>(
    `?status=active&limit=${limit}&offset=${offset}`,
  );
}

export async function createPrayerRequest(
  payload: CreatePrayerRequestPayload,
): Promise<PrayerRequest> {
  return prayerFetch<PrayerRequest>('', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function prayForRequest(id: string): Promise<{ prayerCount: number }> {
  return prayerFetch<{ prayerCount: number }>(`/${id}/pray`, {
    method: 'POST',
  });
}

export async function deletePrayerRequest(id: string, token: string): Promise<void> {
  return prayerFetch<void>(`/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
