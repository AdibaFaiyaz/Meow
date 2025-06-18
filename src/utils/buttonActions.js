import { Alert } from 'react-native';

export const buttonActions = {
  handleButtonPress: (buttonNumber) => {
    Alert.alert('Meow!', `${buttonNumber} pressed!`);
  },
};