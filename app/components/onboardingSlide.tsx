import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

interface OnboardingItem {
  title: string;
  description: string;
  image?: any;
}

export const OnboardingSlide: React.FC<{ item: OnboardingItem }> = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.image && <Image source={item.image} style={styles.image} resizeMode="contain" />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.textPrimary,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
export default OnboardingSlide;