import { Topic } from '../app/interface/topic';

export type RootStackParamList = {
  SuportNetwork: undefined;
  NewTopic: { setTopics: React.Dispatch<React.SetStateAction<Topic[]>> };
  TopicDetail: { topic: Topic };
};