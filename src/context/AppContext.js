import React, { createContext, useContext, useReducer } from 'react';
import { SOUNDS } from '../constants';

// Initial state
const initialState = {
  currentSound: SOUNDS.meow1,
  volume: 1.0,
  soundEnabled: true,
  animationsEnabled: true,
  hapticEnabled: true,
  theme: 'light',
};

// Action types
const actionTypes = {
  SET_SOUND: 'SET_SOUND',
  SET_VOLUME: 'SET_VOLUME',
  TOGGLE_SOUND: 'TOGGLE_SOUND',
  TOGGLE_ANIMATIONS: 'TOGGLE_ANIMATIONS',
  TOGGLE_HAPTIC: 'TOGGLE_HAPTIC',
  SET_THEME: 'SET_THEME',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SOUND:
      return { ...state, currentSound: action.payload };
    case actionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case actionTypes.TOGGLE_SOUND:
      return { ...state, soundEnabled: !state.soundEnabled };
    case actionTypes.TOGGLE_ANIMATIONS:
      return { ...state, animationsEnabled: !state.animationsEnabled };
    case actionTypes.TOGGLE_HAPTIC:
      return { ...state, hapticEnabled: !state.hapticEnabled };
    case actionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    ...state,
    setSound: (sound) => dispatch({ type: actionTypes.SET_SOUND, payload: sound }),
    setVolume: (volume) => dispatch({ type: actionTypes.SET_VOLUME, payload: volume }),
    toggleSound: () => dispatch({ type: actionTypes.TOGGLE_SOUND }),
    toggleAnimations: () => dispatch({ type: actionTypes.TOGGLE_ANIMATIONS }),
    toggleHaptic: () => dispatch({ type: actionTypes.TOGGLE_HAPTIC }),
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
