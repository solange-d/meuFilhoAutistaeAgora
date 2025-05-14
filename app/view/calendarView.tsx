import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CalendarView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meu Calendário</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
