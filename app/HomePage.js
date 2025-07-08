import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { MeowCircle, FloatingButtonGroup, appStyles, mainCircleStyles, useBounceAnimation, useSoundLoader, usePressAnimation } from '../src';
import CustomAlert from '../src/components/CustomAlert';
import { useCustomAlert } from '../src/hooks/useCustomAlert';

export default function HomePage() {
  const { soundObject, isLoaded } = useSoundLoader(require('../assets/meow1.mp3'));
  const { translateY } = useBounceAnimation();
  const { scaleAnim, handlePress } = usePressAnimation();
  const { alertVisible, alertData, showAlert, hideAlert } = useCustomAlert();

  const onPress = () => handlePress(soundObject, isLoaded);
  const router = useRouter();
  
  return (
    <View style={appStyles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animated.View
          style={[
            mainCircleStyles.circle,
            { transform: [{ translateY }, { scale: scaleAnim }] }
          ]}        
        >
          <MeowCircle />
        </Animated.View>
      </TouchableOpacity>

      <FloatingButtonGroup showAlert={showAlert} />
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={hideAlert}
      />
      
      {/* Arrow button positioned at bottom right */}
      <TouchableOpacity 
        style={styles.arrowButton}
        onPress={() => router.push("./SecondPage")}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  arrowButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
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
  arrowText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});