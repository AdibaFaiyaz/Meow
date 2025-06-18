import React from 'react';
import { View, Text } from 'react-native';
import { circleStyles } from '../styles/circleStyles';

const MeowCircle = () => {
  return (
    <View style={circleStyles.circle}>
      <Text style={circleStyles.meowText}>meow</Text>
    </View>
  );
};

export default MeowCircle;