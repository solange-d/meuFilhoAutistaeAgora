import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { rightsLinks } from '../../constants/rightsLinks';

const RightsBenefitsView = () => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Direitos e Benefícios</Text>

      {rightsLinks.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSummary}>{item.summary}</Text>
          <TouchableOpacity style={styles.button} onPress={() => openLink(item.url)}>
            <Text style={styles.buttonText}>Saiba mais</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default RightsBenefitsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
