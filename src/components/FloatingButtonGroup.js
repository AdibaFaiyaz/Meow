import React from 'react';
import { View } from 'react-native';
import FloatingButton from './FloatingButton';
import { floatingButtonStyles } from '../styles/floatingButtonStyles';

const FloatingButtonGroup = ({ showAlert }) => {
  const handleButtonPress = (buttonNumber) => {
    showAlert('Meow!', `Button ${buttonNumber} pressed!`);
  };

  return (
    <View>
      <FloatingButton
        icon="♡"
        buttonType="babyPink"
        style={floatingButtonStyles.position1}
        onPress={() => handleButtonPress(1)}
      />
    </View>
  );
};

export default FloatingButtonGroup;