import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const DocumentsView = ({ navigation }: any) => {
  const documents = [
    {
      id: 1,
      title: 'Carteirinha de Identificação',
      description: 'Documento oficial que deve ser renovado anualmente.',
    },
    {
      id: 2,
      title: 'Certificado de Vacinação',
      description: 'Certificado com as vacinas tomadas até o momento.',
    },
    {
      id: 3,
      title: 'Documento de Identidade',
      description: 'RG ou CPF, utilizado para identificação pessoal.',
    },
    {
      id: 4,
      title: 'Comprovante de Endereço',
      description: 'Comprovante de residência recente.',
    },
  ];

  const handleAddDocument = () => {
    Alert.alert('Funcionalidade Futura', 'A tela para adicionar um novo documento será implementada aqui.');
  };

  const handleExportDocuments = () => {
    Alert.alert('Funcionalidade Futura', 'A funcionalidade para exportar documentos será implementada aqui.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Documentos</Text>
      </View>

    
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddDocument}
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

      <View style={styles.documentsContainer}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <Text style={styles.documentTitle}>{doc.title}</Text>
            <Text style={styles.documentDescription}>{doc.description}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('DocumentDetail', { documentId: doc.id })}
            >
              <Text style={styles.viewButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
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
    marginTop: 20,
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
});

export default DocumentsView;
