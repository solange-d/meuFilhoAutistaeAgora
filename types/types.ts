import { Topic } from '../app/interface/topic';

export type RootStackParamList = {
  SuportNetwork: undefined;
  NewTopic: { setTopics: React.Dispatch<React.SetStateAction<Topic[]>> };
  TopicDetail: { topic: Topic };
};

export type CalendarEvent = {
  id: string;
  summary: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
};
