import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';

// Using expo-av with comprehensive fallbacks
let Audio;
try {
  const ExpoAV = require('expo-av');
  Audio = ExpoAV.Audio;
} catch (error) {
  console.log('expo-av not available:', error);
}

export const useSoundLoader = (soundFile, options = {}) => {
  const [soundObject, setSoundObject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { volume = 1.0, shouldLoop = false, preload = true } = options;

  const playSound = useCallback(async () => {
    if (!soundObject || !isLoaded) return;
    
    try {
      setIsPlaying(true);
      if (soundObject.type === 'expo-av') {
        await soundObject.replayAsync();
      } else if (soundObject.play) {
        soundObject.play();
      }
    } catch (err) {
      console.error('Error playing sound:', err);
      setError(err);
    }
  }, [soundObject, isLoaded]);

  const stopSound = useCallback(async () => {
    if (!soundObject || soundObject.type !== 'expo-av') return;
    
    try {
      await soundObject.sound.stopAsync();
      setIsPlaying(false);
    } catch (err) {
      console.error('Error stopping sound:', err);
    }
  }, [soundObject]);

  useEffect(() => {
    const loadSound = async () => {
      try {
        setError(null);
        // Try expo-av first
        if (Audio && Audio.Sound) {
          console.log('Loading sound with expo-av...');
          const { sound } = await Audio.Sound.createAsync(
            soundFile, 
            { 
              shouldPlay: false,
              isLooping: shouldLoop,
              volume: volume
            }
          );
          
          // Set up status listener
          sound.setOnPlaybackStatusUpdate((status) => {
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          });
          
          setSoundObject({ 
            type: 'expo-av', 
            sound,
            replayAsync: () => sound.replayAsync(),
            setOnPlaybackStatusUpdate: (callback) => sound.setOnPlaybackStatusUpdate(callback),
            stopAsync: () => sound.stopAsync(),
            setVolumeAsync: (vol) => sound.setVolumeAsync(vol)
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
            play: () => {
              console.log('🐱 Web Meow!');
              setIsPlaying(true);
              setTimeout(() => setIsPlaying(false), 800);
            }
          });
          setIsLoaded(true);
          return;
        }
        
        // Default fallback
        console.log('Using console fallback');
        setSoundObject({ 
          type: 'console',
          play: () => {
            console.log('🐱 Console Meow!');
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 800);
          }
        });
        setIsLoaded(true);
        
      } catch (error) {
        console.log('Error loading sound, using fallback:', error);
        setError(error);
        setSoundObject({ 
          type: 'fallback',
          play: () => {
            console.log('🐱 Fallback Meow!');
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 800);
          }
        });
        setIsLoaded(true);
      }
    };
    
    if (preload) {
      loadSound();
    }

    return () => {
      if (soundObject && soundObject.sound && soundObject.sound.unloadAsync) {
        soundObject.sound.unloadAsync().catch(console.error);
      }
    };
  }, [soundFile, volume, shouldLoop, preload]);

  return { 
    soundObject, 
    isLoaded, 
    error, 
    isPlaying, 
    playSound, 
    stopSound 
  };
};
