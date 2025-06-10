import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from './interface/topic';

import BottomTabs from './navigation/bottomTabs';
import ChangePassword from './view/changePasswordView';
import EditProfile from './view/editProfileView';
import LoginForm from './view/loginFormView';
import LoginView from './view/loginView';
import NewTopic from './view/newTopicView';
import OnboardingView from './view/onboardingView';
import PrivacyPolicy from './view/privacyPolicyView';
import RegisterForm from './view/registerFormView';
import SettingsView from './view/settingsView';
import SuportNetwork from './view/suportNetworkView';
import TopicDetail from './view/topicDetailView';
import RightsBenefits from './view/rightsBenefitsView';

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="RightsBenefits" component={RightsBenefits} />
      <Stack.Screen name="NewTopic" component={NewTopic} />
      <Stack.Screen name="TopicDetail" component={TopicDetail} />
    </Stack.Navigator>
  );
}
