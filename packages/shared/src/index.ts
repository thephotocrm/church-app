// Shared types used by both API and mobile app

export type GlobalRole = 'super_admin' | 'admin' | 'pastor' | 'staff' | 'member';
export type GroupRole = 'group_leader' | 'moderator' | 'group_member';
export type UserStatus = 'pending' | 'active' | 'suspended';
export type LivestreamProvider = 'youtube' | 'custom';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  status: UserStatus;
  globalRole: GlobalRole;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Sermon {
  id: string;
  title: string;
  description?: string;
  speaker: string;
  date: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  seriesName?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startsAt: string;
  endsAt?: string;
  imageUrl?: string;
  rsvpEnabled: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  fundName?: string;
  recurring: boolean;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export interface LivestreamConfig {
  id: string;
  provider: LivestreamProvider;
  youtubeVideoId?: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  isLive: boolean;
}
