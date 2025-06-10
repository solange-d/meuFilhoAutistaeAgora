import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Topic } from '../interface/topic';
import uuid from 'react-native-uuid';

type NewTopicProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewTopic'>;
  route: { params: { setTopics: React.Dispatch<React.SetStateAction<Topic[]>> } };
};

const NewTopicView: React.FC<NewTopicProps> = ({ navigation, route }) => {
  const { setTopics } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const newTopic: Topic = {
      id: uuid.v4().toString(),
      title: title.trim(),
      description: description.trim(),
      likes: 0,
      comments: [],
    };

    setTopics(prevTopics => [...prevTopics, newTopic]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Tópico</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do tópico"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do tópico"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="send" size={20} color="#fff" />
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTopicView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
