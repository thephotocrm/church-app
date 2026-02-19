import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { HomeScreen } from '../screens/home/HomeScreen';
import { EventsScreen } from '../screens/events/EventsScreen';
import { EventDetailScreen } from '../screens/events/EventDetailScreen';
import { AddEventScreen } from '../screens/events/AddEventScreen';
import { WatchScreen } from '../screens/watch/WatchScreen';
import { GroupsScreen } from '../screens/groups/GroupsScreen';
import { GroupDetailScreen } from '../screens/groups/GroupDetailScreen';
import { GivingScreen } from '../screens/giving/GivingScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { GroupChatScreen } from '../screens/chat/GroupChatScreen';
import { DMListScreen } from '../screens/chat/DMListScreen';
import { DMChatScreen } from '../screens/chat/DMChatScreen';
import { AuthRequiredScreen } from '../screens/auth/AuthRequiredScreen';
import { MoreMenuScreen } from '../screens/more/MoreMenuScreen';
import { BibleScreen } from '../screens/bible/BibleScreen';
import { LocationScreen } from '../screens/location/LocationScreen';
import { PrayerRequestScreen } from '../screens/prayer/PrayerRequestScreen';
import { CustomTabBar } from '../components/ui/CustomTabBar';
import { useTheme } from '../lib/useTheme';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();
const WatchStack = createNativeStackNavigator();
const GroupsStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

function HomeStackScreen() {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontFamily: 'OpenSans_600SemiBold' },
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <HomeStack.Screen name="Bible" component={BibleScreen} />
      <HomeStack.Screen name="Location" component={LocationScreen} options={{ title: 'Our Location' }} />
      <HomeStack.Screen name="PrayerRequest" component={PrayerRequestScreen} options={{ title: 'Prayer Request' }} />
    </HomeStack.Navigator>
  );
}

function EventsStackScreen() {
  const { colors } = useTheme();
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontFamily: 'OpenSans_600SemiBold' },
        headerShadowVisible: false,
      }}
    >
      <EventsStack.Screen name="EventsList" component={EventsScreen} options={{ headerShown: false }} />
      <EventsStack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event' }} />
      <EventsStack.Screen name="AddEvent" component={AddEventScreen} options={{ title: 'Add Event' }} />
    </EventsStack.Navigator>
  );
}

function WatchStackScreen() {
  const { colors } = useTheme();
  return (
    <WatchStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontFamily: 'OpenSans_600SemiBold' },
        headerShadowVisible: false,
      }}
    >
      <WatchStack.Screen name="WatchScreen" component={WatchScreen} options={{ title: 'Watch' }} />
    </WatchStack.Navigator>
  );
}

function GroupsStackScreen() {
  const { colors } = useTheme();

  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontFamily: 'OpenSans_600SemiBold' },
        headerShadowVisible: false,
      }}
    >
      <GroupsStack.Screen name="GroupsList" component={GroupsScreen} options={{ headerShown: false }} />
      <GroupsStack.Screen name="GroupChat" component={GroupChatScreen} options={{ headerShown: false }} />
      <GroupsStack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ headerShown: false }} />
    </GroupsStack.Navigator>
  );
}

function MoreStackScreen() {
  const { colors } = useTheme();

  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontFamily: 'OpenSans_600SemiBold' },
        headerShadowVisible: false,
      }}
    >
      <MoreStack.Screen name="MoreMenu" component={MoreMenuScreen} options={{ title: 'More' }} />
      <MoreStack.Screen name="Bible" component={BibleScreen} />
      <MoreStack.Screen name="PrayerRequest" component={PrayerRequestScreen} options={{ title: 'Prayer Request' }} />
      <MoreStack.Screen name="Location" component={LocationScreen} options={{ title: 'Our Location' }} />
      <MoreStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <MoreStack.Screen name="Giving" component={GivingScreen} />
      <MoreStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      <MoreStack.Screen name="DMList" component={DMListScreen} options={{ title: 'Messages' }} />
      <MoreStack.Screen name="DMChat" component={DMChatScreen} options={{ title: 'Message' }} />
    </MoreStack.Navigator>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Events" component={EventsStackScreen} />
      <Tab.Screen name="Watch" component={WatchStackScreen} />
      <Tab.Screen name="Groups" component={GroupsStackScreen} />
      <Tab.Screen name="More" component={MoreStackScreen} />
    </Tab.Navigator>
  );
}
