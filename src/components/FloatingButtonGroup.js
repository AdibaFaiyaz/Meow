import React from 'react';
import { View, Animated } from 'react-native';
import FloatingButton from './FloatingButton';
import { floatingButtonStyles } from '../styles/floatingButtonStyles';
import { useBounceAnimation } from '../hooks/useBounceAnimation';

const FloatingButtonGroup = ({ showAlert }) => {
  const { translateY } = useBounceAnimation();

  const handleButtonPress = (buttonNumber) => {
    showAlert('Meow!', `Button ${buttonNumber} pressed!`);
  };

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {[...Array(9)].map((_, index) => (
        <FloatingButton
          key={index + 1}
          icon="♡"
          buttonType="babyPink"
          style={floatingButtonStyles[`position${index + 1}`]}
          onPress={() => handleButtonPress(index + 1)}
        />
      ))}
    </Animated.View>
  );
};

export default FloatingButtonGroup;