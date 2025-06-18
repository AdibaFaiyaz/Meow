import { StyleSheet } from 'react-native';

const RADIUS = 120; // Radius of the circle
const BUTTON_RADIUS = 28; // Radius of the button (half of button size)
const VERTICAL_OFFSET = -70; // Offset to push circle upward

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
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    [`position${i + 1}`]: {
      position: 'absolute',
      marginLeft: Math.cos(i * (2 * Math.PI / 9)) * RADIUS - BUTTON_RADIUS,
      marginTop: (Math.sin(i * (2 * Math.PI / 9)) * RADIUS - BUTTON_RADIUS) + VERTICAL_OFFSET,
    }
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
});