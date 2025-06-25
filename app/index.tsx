import { createStackNavigator } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import { RootStackParamList } from '../interfaces/topic';
import { initDB } from '../service/databaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabs from './navigation/bottomTabs';
import ChangePassword from './views/changePasswordView';
import Documents from './views/documentsView';
import EditProfile from './views/editProfileView';
import informationAndGuildeLiness from './views/informationAndGuildeLinessView';
import LoginForm from './views/loginFormView';
import LoginView from './views/loginView';
import NewTopic from './views/newTopicView';
import OnboardingView from './views/onboardingView';
import PrivacyPolicy from './views/privacyPolicyView';
import RegisterForm from './views/registerFormView';
import RightsBenefits from './views/rightsBenefitsView';
import SettingsView from './views/settingsView';
import SuportNetwork from './views/suportNetworkView';
import TopicDetail from './views/topicDetailView';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<'Onboarding' | 'BottomTabs'>('Onboarding');

  useEffect(() => {
    const checkLogin = async () => {
      initDB();
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setInitialRoute('BottomTabs');
      }
    };
    checkLogin();
  }, []);

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
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="informationAndGuildeLiness" component={informationAndGuildeLiness} />
      <Stack.Screen name="NewTopic" component={NewTopic} />
      <Stack.Screen name="TopicDetail" component={TopicDetail} />
    </Stack.Navigator>
  );
}
