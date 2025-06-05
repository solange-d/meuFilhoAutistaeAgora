import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';

const NewTopicView = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTopic = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Simulação de envio para o backend
      const response = await fetch('https://api.exemplo.com/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Tópico criado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Não foi possível criar o tópico.');
      }
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o tópico.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Tópico</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do tópico"
        placeholderTextColor={Colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição"
        placeholderTextColor={Colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateTopic}>
        <Text style={styles.buttonText}>Criar Tópico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTopicView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: Colors.primary,
    backgroundColor: Colors.backgroundSecondary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
