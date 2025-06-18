import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Animated, TouchableOpacity } from 'react-native';

import { MeowCircle, FloatingButtonGroup, appStyles, mainCircleStyles, useBounceAnimation, useSoundLoader, usePressAnimation } from './src';
import CustomAlert from './src/components/CustomAlert';
import { useCustomAlert } from './src/hooks/useCustomAlert';

export default function App() {
  const { soundObject, isLoaded } = useSoundLoader(require('./assets/meow1.mp3'));
  const { translateY } = useBounceAnimation();
  const { scaleAnim, handlePress } = usePressAnimation();
  const { alertVisible, alertData, showAlert, hideAlert } = useCustomAlert();

  const onPress = () => handlePress(soundObject, isLoaded);
  
  return (
    <View style={appStyles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animated.View
          style={[
            mainCircleStyles.circle,
            { transform: [{ translateY }, { scale: scaleAnim }] }
          ]}        >
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

      <StatusBar style="auto" />
    </View>
  );
}
