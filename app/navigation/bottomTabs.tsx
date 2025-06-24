import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constants/Colors';
import CalendarView from '../views/calendarView';
import HomeView from '../views/homeView';
import NotificationView from '../views/notificationsView';
import ProfileView from '../views/profileView';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Notificações') iconName = 'notifications-outline';
          else if (route.name === 'Calendário') iconName = 'calendar-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          height: 75,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Notificações" component={NotificationView} />
      <Tab.Screen name="Calendário" component={CalendarView} />
      <Tab.Screen name="Perfil" component={ProfileView} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    position: 'absolute',
    bottom: 16,
    left: 18, 
    right: 18,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
