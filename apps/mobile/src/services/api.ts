import type { User } from '@church-app/shared';

const API_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.yourchurch.com/api'; // TODO: update with real URL

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export const api = {
  // Auth
  register: (name: string, email: string, password: string) =>
    request<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: (token: string) =>
    request<User>('/users/me', {
      headers: authHeaders(token),
    }),

  // Sermons
  getSermons: (token: string, page = 1) =>
    request<{ data: any[]; total: number }>(`/sermons?page=${page}`, {
      headers: authHeaders(token),
    }),

  // Events
  getEvents: (token: string) =>
    request<{ data: any[] }>('/events', {
      headers: authHeaders(token),
    }),

  // Announcements
  getAnnouncements: (token: string) =>
    request<{ data: any[] }>('/announcements', {
      headers: authHeaders(token),
    }),

  // Groups
  getGroups: (token: string) =>
    request<{ data: any[] }>('/groups', {
      headers: authHeaders(token),
    }),
};
