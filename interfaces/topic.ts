export interface Topic {
  id: string;
  title: string;
  description: string;
  likes: number;
  comments: string[];
  createdAt?: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  LoginForm: undefined;
  RegisterForm: undefined;
  AppNavigator: undefined;
  BottomTabs: undefined;
  EditProfile: undefined;
  SettingsView: undefined;
  ChangePassword: undefined;
  PrivacyPolicy: undefined;
  SuportNetwork: undefined;
  RightsBenefits: undefined;
  Documents: undefined;
  informationAndGuildeLiness: undefined;
  NewTopic: { setTopics: React.Dispatch<React.SetStateAction<Topic[]>> };
  TopicDetail: { topic: Topic };

  DocumentDetail: { documentId: number };
  AddDocument: undefined; 
  EditDocument: { document: { id: number; name: string; dueDate: string; notes: string; } };

};