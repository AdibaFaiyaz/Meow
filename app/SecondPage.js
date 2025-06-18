import React from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { MeowCircle, FloatingButtonGroup, appStyles, mainCircleStyles, useBounceAnimation, useSoundLoader, usePressAnimation } from '../src';


const SecondPage = () => {
  const router = useRouter();

  return (
    <View style={appStyles.container}>
      <Text>Second Page</Text>
      <Text>This is the second page of our application.</Text>
      <Link href="/">
        <Text>Back to Home</Text>
      </Link>
    </View>
  );
};

export default SecondPage;
