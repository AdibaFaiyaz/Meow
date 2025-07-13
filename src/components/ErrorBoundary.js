import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>🐱 Meow! Something went wrong</Text>
          <Text style={styles.message}>
            Don't worry, the cats are working on it!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.base * 2,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.body,
    color: COLORS.black,
    marginBottom: SIZES.base * 2,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});

export default ErrorBoundary;
