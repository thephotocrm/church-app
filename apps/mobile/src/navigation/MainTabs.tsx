import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SermonsScreen } from '../screens/sermons/SermonsScreen';
import { SermonDetailScreen } from '../screens/sermons/SermonDetailScreen';
import { EventsScreen } from '../screens/events/EventsScreen';
import { EventDetailScreen } from '../screens/events/EventDetailScreen';
import { GroupsScreen } from '../screens/groups/GroupsScreen';
import { GroupDetailScreen } from '../screens/groups/GroupDetailScreen';
import { GivingScreen } from '../screens/giving/GivingScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { LivestreamScreen } from '../screens/livestream/LivestreamScreen';
import { GroupChatScreen } from '../screens/chat/GroupChatScreen';
import { DMListScreen } from '../screens/chat/DMListScreen';
import { DMChatScreen } from '../screens/chat/DMChatScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SermonsStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();
const GroupsStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <HomeStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <HomeStack.Screen name="Livestream" component={LivestreamScreen} options={{ title: 'Watch Live' }} />
    </HomeStack.Navigator>
  );
}

function SermonsStackScreen() {
  return (
    <SermonsStack.Navigator>
      <SermonsStack.Screen name="SermonsList" component={SermonsScreen} options={{ title: 'Sermons' }} />
      <SermonsStack.Screen name="SermonDetail" component={SermonDetailScreen} options={{ title: 'Sermon' }} />
    </SermonsStack.Navigator>
  );
}

function EventsStackScreen() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen name="EventsList" component={EventsScreen} options={{ title: 'Events' }} />
      <EventsStack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event' }} />
    </EventsStack.Navigator>
  );
}

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="GroupsList" component={GroupsScreen} options={{ title: 'Groups' }} />
      <GroupsStack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ title: 'Group' }} />
      <GroupsStack.Screen name="GroupChat" component={GroupChatScreen} options={{ title: 'Chat' }} />
    </GroupsStack.Navigator>
  );
}

function MoreStackScreen() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      <MoreStack.Screen name="Giving" component={GivingScreen} />
      <MoreStack.Screen name="DMList" component={DMListScreen} options={{ title: 'Messages' }} />
      <MoreStack.Screen name="DMChat" component={DMChatScreen} options={{ title: 'Message' }} />
    </MoreStack.Navigator>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Sermons" component={SermonsStackScreen} />
      <Tab.Screen name="Events" component={EventsStackScreen} />
      <Tab.Screen name="Groups" component={GroupsStackScreen} />
      <Tab.Screen name="More" component={MoreStackScreen} />
    </Tab.Navigator>
  );
}
