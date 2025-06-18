import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { floatingButtonStyles } from '../styles/floatingButtonStyles';

const FloatingButton = ({ 
  onPress, 
  icon, 
  style, 
  buttonType = 'babyPink',
  activeOpacity = 0.8 
}) => {
  const buttonStyle = [
    floatingButtonStyles.floatingButton,
    floatingButtonStyles[`${buttonType}Button`],
    style
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Text style={floatingButtonStyles.buttonText}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;