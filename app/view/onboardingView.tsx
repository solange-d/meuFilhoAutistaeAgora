import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { OnboardingSlide } from '../components/onboardingSlide';
import { onboardingData } from '../viewmodel/onboardingViewModel';
import { Colors } from '../styles/colors';

const OnboardingView = ({ navigation }: any) => {
  const handleFinish = () => {
    navigation.replace('Login');
  };
  
  return (
    <Swiper
      loop={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}
    >
      {onboardingData.map((item, index) => (
        <View key={index} style={styles.slide}>
          <OnboardingSlide item={item} />
          {index === onboardingData.length - 1 && (
            <View style={styles.buttonContainer}>
              <Button title="Começar" onPress={handleFinish} />
            </View>
          )}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  dot: {
    backgroundColor: Colors.backgroundSecondary,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#007bff',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  pagination: {
    bottom: 100,
  },
  
  buttonContainer: {
    width: '60%',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default OnboardingView;
