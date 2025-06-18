import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

interface DistanceSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const DistanceSlider: React.FC<DistanceSliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 5,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {value === 0 ? 'Todos os eventos' : `Raio: ${value} km`}
      </Text>
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.backgroundSecondary}
        thumbTintColor={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: Colors.textPrimary,
  },
});

export default DistanceSlider;
