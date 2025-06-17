import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export default function App() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // New animated value for scaling
  const soundObject = useRef(new Audio.Sound()).current;

  // Continuous bouncing animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    // Load the sound when the component mounts
    const loadSound = async () => {
      try {
        // Using meow1.mp3 as per your assets folder
        await soundObject.loadAsync(require('./assets/meow1.mp3'));
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };
    loadSound();

    // Unload the sound when the component unmounts
    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  const handlePress = async () => {
    // Play the sound
    try {
      await soundObject.replayAsync();
      // Start scale animation when sound plays
      Animated.timing(scaleAnim, {
        toValue: 1.1, // Scale up by 10%
        duration: 200, // Quick scale up
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Listen for sound playback status to scale down after it finishes
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          Animated.timing(scaleAnim, {
            toValue: 1, // Scale back to original size
            duration: 200, // Quick scale down
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }).start(() => {
              // Reset the status update listener after animation completes
              soundObject.setOnPlaybackStatusUpdate(null);
          });
        }
      });

    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };
  
  // Calculate the translation based on the animated value
  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Animated.View 
          style={[
            styles.circle,
            { transform: [{ translateY }, { scale: scaleAnim }] } // Apply both animations
          ]}
        >
          <Text style={styles.meowText}>meow</Text>
        </Animated.View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB6C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meowText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});
