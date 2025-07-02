import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../interfaces/topic';
import { updateDocumentRepo } from '../../repository/DocumentRepository';
  
  type EditDocumentScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'EditDocument'
  >;
  type EditDocumentScreenRouteProp = RouteProp<
    RootStackParamList,
    'EditDocument'
  >;
  
  type Props = {
    route: EditDocumentScreenRouteProp;
    navigation: EditDocumentScreenNavigationProp;
  };
  
  const EditDocumentView = ({ route, navigation }: Props) => {
    const { document } = route.params;
  
    const [name, setName] = useState(document?.name || '');
    const [dueDate, setDueDate] = useState(document?.dueDate || '');
    const [notes, setNotes] = useState(document?.notes || '');
  
    const handleSaveChanges = async () => {
      try {
        await updateDocumentRepo({
          id: document.id,
          name,
          dueDate,
          notes,
        });
        Alert.alert('Sucesso!', 'Documento atualizado.');
        navigation.pop(2);
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Editar Documento</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Nome do Documento"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Vencimento (DD/MM/AAAA)"
          value={dueDate}
          onChangeText={setDueDate}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Observações"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
  
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
      paddingTop: 60,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      textAlign: 'center',
      marginBottom: 30,
    },
    input: {
      height: 50,
      backgroundColor: Colors.backgroundSecondary,
      borderColor: Colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      color: Colors.primary,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
    saveButton: {
      backgroundColor: Colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: Colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
  export default EditDocumentView;