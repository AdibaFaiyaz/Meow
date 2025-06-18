import { StyleSheet } from 'react-native';

export const floatingButtonStyles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  babyPinkButton: {
    backgroundColor: '#F8BBD9',
  },  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Position styles - only one button in center
  position1: {
    top: 30,
    alignSelf: 'center',
  },
});
