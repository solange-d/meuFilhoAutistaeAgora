import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../interfaces/topic';
import {
  deleteDocumentRepo,
  fetchDocumentDetailsById,
} from '../../repository/DocumentRepository';

interface DocumentDetails {
  id: number;
  name: string;
  dueDate: string;
  notes: string;
}

type DocumentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'DocumentDetail'
>;

const DocumentDetailView = () => {
  const route = useRoute<DocumentDetailScreenRouteProp>();
  const navigation = useNavigation(); 
  const { documentId } = route.params;

  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchDocumentDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchDocumentDetailsById(documentId);
      setDocument(data as DocumentDetails | null);
    } catch (error) {
      console.error('[View] Erro ao buscar detalhes do documento:', error);
      setDocument(null);
    } finally {
      setIsLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchDocumentDetails();
  }, [fetchDocumentDetails]);

  const handleDelete = () => {
    Alert.alert(
      'Excluir Documento',
      'Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDocumentRepo(documentId);
              Alert.alert('Sucesso', 'Documento excluído.');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o documento.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    if (document) {
      navigation.navigate('EditDocument', { document });
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!document) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Documento não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{document.name}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Vencimento:</Text>
        <Text style={styles.value}>{document.dueDate || 'Não informado'}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Observações:</Text>
        <Text style={styles.value}>{document.notes || 'Nenhuma'}</Text>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={handleEdit}
        >
          <Icon name="pencil-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Icon name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
  },
  detailContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 18,
    color: Colors.danger,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: Colors.secondary,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
});

export default DocumentDetailView;