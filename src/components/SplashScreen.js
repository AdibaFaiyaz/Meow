import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SplashScreen = ({ onComplete }) => {
  const circleScale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const meowButtonScale = useRef(new Animated.Value(0)).current;
  const meowButtonOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start the animation sequence
    const animationSequence = Animated.sequence([
      // First, show the meow button appearing with a gentle bounce
      Animated.spring(meowButtonScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      // Small delay
      Animated.delay(200),
      // Then expand the pink circle from behind the button
      Animated.timing(circleScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(400),
      // Fade out the meow button first
      Animated.timing(meowButtonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Finally fade out the entire splash screen
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      if (onComplete) {
        onComplete();
      }
    });
  }, []);

  // Calculate the scale needed to fill the entire screen from the center
  const maxDimension = Math.max(screenWidth, screenHeight);
  const finalScale = (maxDimension * 1.5) / 100; // 100 is the actual button size

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {/* Pink expanding circle */}
      <Animated.View
        style={[
          styles.expandingCircle,
          {
            transform: [
              {
                scale: circleScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, finalScale],
                }),
              },
            ],
          },
        ]}
      />
      
      {/* Meow button that appears first */}
      <Animated.View
        style={[
          styles.meowButton,
          {
            opacity: meowButtonOpacity,
            transform: [{ scale: meowButtonScale }],
          },
        ]}
      >
        <View style={styles.buttonInner}>
          <Animated.Text style={styles.meowText}>meow</Animated.Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  expandingCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFB6C1',
  },
  meowButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meowText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default SplashScreen;