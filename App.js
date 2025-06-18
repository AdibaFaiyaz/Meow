import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { MeowCircle, FloatingButtonGroup, appStyles } from './src';
import CustomAlert from './src/components/CustomAlert';
import { useCustomAlert } from './src/hooks/useCustomAlert';

export default function App() {
  const { alertVisible, alertData, showAlert, hideAlert } = useCustomAlert();

  return (
    <View style={appStyles.container}>
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
