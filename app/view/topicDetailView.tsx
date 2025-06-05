
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

const TopicDetailView = ({ route }: any) => {
  const { topicId } = route.params;
  const [topic, setTopic] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTopicDetails();
  }, []);

  const fetchTopicDetails = async () => {
    setLoading(true);
    try {
      // Simulação de chamada à API
      const response = await fetch(`https://api.exemplo.com/topics/${topicId}`);
      const data = await response.json();
      setTopic(data.topic);
      setComments(data.comments);
    } catch (error) {
      console.error('Erro ao buscar detalhes do tópico:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      // Simulação de chamada à API
      const response = await fetch(`https://api.exemplo.com/topics/${topicId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setComments(prev => [data.comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentMeta}>
        {new Date(item.createdAt).toLocaleDateString()} · {item.likesCount} curtidas
      </Text>
    </View>
  );

  if (loading || !topic) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topicHeader}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicMeta}>
          Por {topic.author} em {new Date(topic.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.topicContent}>{topic.content}</Text>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        contentContainerStyle={styles.commentsList}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escreva um comentário..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
          <Text style={styles.commentButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopicDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  topicMeta: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  topicContent: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 12,
  },
  commentsList: {
    padding: 16,
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  commentContent: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  commentMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  commentButton: {
    marginLeft: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  commentButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
