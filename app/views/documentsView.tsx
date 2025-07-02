
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { fetchDocumentsForUser } from '../../repository/DocumentRepository';

interface Document {
  id: number;
  name: string;
  dueDate: string;
  notes: string;
}

const DocumentsView = ({ navigation }: any) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadDocuments = async () => {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          const userDocuments = await fetchDocumentsForUser(user.id);
          setDocuments(userDocuments as Document[]);
        }
      };
      loadDocuments();
    }, [])
  );

  const handleExportDocuments = () => {
    Alert.alert('Funcionalidade Futura', 'A funcionalidade para exportar documentos será implementada aqui.');
  };

  const handleAddDocument = () => {
    Alert.alert('Funcionalidade Futura', 'A tela para adicionar um novo documento será implementada aqui.');
  };

  const handleExportDocuments = () => {
    Alert.alert('Funcionalidade Futura', 'A funcionalidade para exportar documentos será implementada aqui.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Documentos</Text>
      </View>


      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddDocument')} 

        >
          <Icon name="add-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.actionButtonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleExportDocuments}
        >
          <Icon name="share-outline" size={20} color={Colors.primary} />
          <Text style={styles.actionButtonText}>Exportar</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum documento cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.documentCard}>
            <Text style={styles.documentTitle}>{item.name}</Text>
            {item.dueDate && <Text style={styles.documentDescription}>Vencimento: {item.dueDate}</Text>}
            {item.notes && <Text style={styles.documentDescription}>Obs: {item.notes}</Text>}

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate('DocumentDetail', { documentId: item.id })
              }
            >
              <Text style={styles.viewButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  actionButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  documentsContainer: {
    marginTop: 10,
  },
  documentCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  documentDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default DocumentsView;
