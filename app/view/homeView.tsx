// src/view/HomeView.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      {/* Adicione aqui os componentes específicos da sua tela inicial */}
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
