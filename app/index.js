import React, { useState } from 'react';
import { View } from 'react-native';
import HomePage from './HomePage';
import SplashScreen from '../src/components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomePage />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </View>
  );
}
