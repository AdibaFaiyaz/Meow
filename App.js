import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import { MeowCircle, FloatingButtonGroup, appStyles } from './src';
import CustomAlert from './src/components/CustomAlert';
import { useCustomAlert } from './src/hooks/useCustomAlert';

export default function App() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundObject = useRef(new Audio.Sound()).current;
  const { alertVisible, alertData, showAlert, hideAlert } = useCustomAlert();

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

    const loadSound = async () => {
      try {
        await soundObject.loadAsync(require('./assets/meow1.mp3'));
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };
    loadSound();

    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  const handlePress = async () => {
    try {
      await soundObject.replayAsync();

      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

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
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <View style={appStyles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateY }, { scale: scaleAnim }] }
          ]}
        >
          <Text style={styles.meowText}>meow</Text>
        </Animated.View>
      </TouchableOpacity>

      <MeowCircle />
      <FloatingButtonGroup showAlert={showAlert} />
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={hideAlert}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  meowText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
});
