import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Documentos</Text>
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
