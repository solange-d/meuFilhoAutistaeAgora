// src/index.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingView from './view/onboardingView';
import LoginView from './view/loginView';
import LoginForm from './view/loginFormView';
import RegisterForm from './view/registerFormView';
import BottomTabs from './navigation/bottomTabs';
import EditProfile from './view/editProfileView';
import SettingsView from './view/settingsView';
import ChangePassword from './view/changePasswordView';
import PrivacyPolicy from './view/privacyPolicyView'; 
import SuportNetwork from './view/suportNetworkView'; 
import NewTopic from './view/newTopicView';
import TopicDetail from './view/topicDetailView';
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
    <Stack.Screen name="SettingsView" component={SettingsView} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="SuportNetwork" component={SuportNetwork} />
    <Stack.Screen name="NewTopic" component={NewTopic} />
    <Stack.Screen name="TopicDetail" component={TopicDetail} />
  </Stack.Navigator>
  
  );
}
