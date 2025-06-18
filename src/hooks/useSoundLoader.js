import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// Using expo-av with comprehensive fallbacks
let Audio;
try {
  const ExpoAV = require('expo-av');
  Audio = ExpoAV.Audio;
} catch (error) {
  console.log('expo-av not available:', error);
}

export const useSoundLoader = (soundFile) => {
  const [soundObject, setSoundObject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      try {
        // Try expo-av first
        if (Audio && Audio.Sound) {
          console.log('Loading sound with expo-av...');
          const { sound } = await Audio.Sound.createAsync(soundFile);
          setSoundObject({ 
            type: 'expo-av', 
            sound,
            replayAsync: () => sound.replayAsync(),
            setOnPlaybackStatusUpdate: (callback) => sound.setOnPlaybackStatusUpdate(callback)
          });
          setIsLoaded(true);
          console.log('Sound loaded successfully with expo-av');
          return;
        }
        
        // Fallback for different platforms
        if (Platform.OS === 'web') {
          console.log('Using web audio fallback');
          setSoundObject({ 
            type: 'web',
            play: () => console.log('🐱 Web Meow!') 
          });
          setIsLoaded(true);
          return;
        }
        
        // Default fallback
        console.log('Using console fallback');
        setSoundObject({ 
          type: 'console',
          play: () => console.log('🐱 Console Meow!') 
        });
        setIsLoaded(true);
        
      } catch (error) {
        console.log('Error loading sound, using fallback:', error);
        setSoundObject({ 
          type: 'fallback',
          play: () => console.log('🐱 Fallback Meow!') 
        });
        setIsLoaded(true);
      }
    };
    
    loadSound();

    return () => {
      if (soundObject && soundObject.sound && soundObject.sound.unloadAsync) {
        soundObject.sound.unloadAsync().catch(console.error);
      }
    };
  }, [soundFile]);

  return { soundObject, isLoaded };
};
