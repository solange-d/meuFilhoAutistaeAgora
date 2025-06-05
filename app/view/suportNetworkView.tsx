import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface Topic {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
}

const SupportNetworkView = ({ navigation }: any) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // Simulação de chamada à API
      const response = await fetch(`https://api.exemplo.com/topics?page=${page}&limit=10`);
      const data = await response.json();
      setTopics(prev => [...prev, ...data.topics]);
      setHasMore(data.topics.length === 10); // Supondo que a API retorna 10 tópicos por página
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTopic = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.topicContainer}
      onPress={() => navigation.navigate('TopicDetail', { topicId: item.id })}
    >
      <Text style={styles.topicTitle}>{item.title}</Text>
      <Text style={styles.topicMeta}>
        Por {item.author} em {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.topicStats}>
        {item.commentsCount} comentários · {item.likesCount} curtidas
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={renderTopic}
        onEndReached={fetchTopics}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={Colors.primary} /> : null}
      />
      <TouchableOpacity
        style={styles.newTopicButton}
        onPress={() => navigation.navigate('NewTopic')}
      >
        <Text style={styles.newTopicButtonText}>Novo Tópico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupportNetworkView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topicContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  topicMeta: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  topicStats: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  newTopicButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
  },
  newTopicButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
