import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const InformationAndGuidelinesView = ({ navigation }: any) => {
  // Exemplo de tópicos e orientações
  const guidelines = [
    {
      id: 1,
      title: 'O que é Autismo?',
      description: 'Aprenda sobre o espectro autista, suas características e como ele afeta a vida cotidiana.',
    },
    {
      id: 2,
      title: 'Diagnóstico do Autismo',
      description: 'Entenda como o diagnóstico de autismo é feito e a importância de um diagnóstico precoce.',
    },
    {
      id: 3,
      title: 'Tratamento e Terapias',
      description: 'Descubra as opções de tratamento e terapias que podem ajudar no desenvolvimento de crianças com autismo.',
    },
    {
      id: 4,
      title: 'Direitos e Benefícios',
      description: 'Informações sobre os direitos e benefícios legais disponíveis para pessoas com autismo e suas famílias.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Informações e Orientações</Text>
      </View>

      <View style={styles.guidelinesContainer}>
        {guidelines.map((guideline) => (
          <View key={guideline.id} style={styles.guidelineCard}>
            <Text style={styles.guidelineTitle}>{guideline.title}</Text>
            <Text style={styles.guidelineDescription}>{guideline.description}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('GuidelineDetail', { guidelineId: guideline.id })}
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
  guidelinesContainer: {
    marginTop: 20,
  },
  guidelineCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  guidelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  guidelineDescription: {
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

export default InformationAndGuidelinesView;
