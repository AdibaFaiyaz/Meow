import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const usePressAnimation = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;  const handlePress = async (soundObject, isLoaded) => {
    try {
      if (isLoaded && soundObject) {
        console.log(`Playing sound using ${soundObject.type} method...`);
        
        if (soundObject.type === 'expo-av') {
          await soundObject.replayAsync();
        } else if (soundObject.play) {
          soundObject.play();
        }
      }

      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      if (isLoaded && soundObject && soundObject.type === 'expo-av') {
        // Real expo-av sound object - use status updates
        soundObject.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }).start(() => {
              soundObject.setOnPlaybackStatusUpdate(null);
            });
          }
        });
      } else {
        // Fallback methods - use timeout
        setTimeout(() => {
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }).start();
        }, 800); // Approximate meow sound duration
      }

    } catch (error) {
      console.log('Error in handlePress:', error);
      // Ensure animation still completes even if sound fails
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, 800);
    }
  };

  return { scaleAnim, handlePress };
};
