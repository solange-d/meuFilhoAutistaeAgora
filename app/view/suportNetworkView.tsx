import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Topic } from '../interface/topic';

const SuportNetworkView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState<Topic[]>([
    { id: '1', title: 'Como lidar com crises sensoriais?', description: 'Descrição do tópico 1', likes: 12, comments: [] },
    { id: '2', title: 'Dicas de rotina para crianças autistas', description: 'Descrição do tópico 2', likes: 7, comments: [] },
    { id: '3', title: 'Direitos garantidos por lei', description: 'Descrição do tópico 3', likes: 15, comments: [] },
  ]);

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderTopic = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.topicCard}
      onPress={() => navigation.navigate('TopicDetail', { topic: item })}>
      <Text style={styles.topicTitle}>{item.title}</Text>
      <View style={styles.likes}>
        <Icon name="heart" size={16} color={Colors.textPrimary} />
        <Text style={styles.likesText}>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rede de Apoio</Text>

      <TextInput
        style={styles.search}
        placeholder="Pesquisar tópicos..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTopics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <TouchableOpacity 
        style={styles.newButton} 
        onPress={() => navigation.navigate('NewTopic', { setTopics })}>
        <Icon name="add-circle" size={24} color="#fff" />
        <Text style={styles.newButtonText}>Novo Tópico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuportNetworkView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  list: {
    flex: 1,
  },
  topicCard: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 6,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  newButton: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  newButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});