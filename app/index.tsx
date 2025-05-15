// src/index.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingView from './view/onboardingView';
import LoginView from './view/loginView';
import LoginForm from './view/loginForm';
import RegisterForm from './view/registerForm';
import BottomTabs from './navigation/bottomTabs';
import EditProfile from './view/editProfileView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingView} />
    <Stack.Screen name="Login" component={LoginView} />
    <Stack.Screen name="LoginForm" component={LoginForm} />
    <Stack.Screen name="RegisterForm" component={RegisterForm} />
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
  </Stack.Navigator>
  
  );
}
