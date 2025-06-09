import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Topic } from '../interface/topic';

type TopicDetailProps = {
  route: RouteProp<RootStackParamList, 'TopicDetail'>;
};

const TopicDetailView: React.FC<TopicDetailProps> = ({ route }) => {
  const { topic } = route.params;
  const [comments, setComments] = useState<string[]>(topic.comments || []);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(topic.likes);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topic.title}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{topic.description}</Text>
      </View>


      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={() => setLikes(likes + 1)} style={styles.likeButton}>
          <Icon name="heart" size={25} color={Colors.danger} />
          <Text style={styles.likeText}>{likes} curtidas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
        keyExtractor={(_, index) => index.toString()}
        style={styles.commentList}
      />

      <TextInput
        style={styles.input}
        placeholder="Adicionar comentário..."
        placeholderTextColor="#999"
        value={newComment}
        onChangeText={setNewComment}
      />

      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.commentButtonText}>Comentar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopicDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  descriptionBox: {
  backgroundColor: '#fff',
  padding: 25,
  borderRadius: 8,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2, 
},

  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  likeContainer: {
    marginBottom: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 6,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  commentList: {
    marginBottom: 20,
  },
  comment: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  commentButton: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
