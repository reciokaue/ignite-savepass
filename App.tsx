import React from 'react';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';

import AppLoading from 'expo-app-loading';
import FlashMessage from 'react-native-flash-message';

import { PasswordProvider, useSettings } from './src/context/settingsContext';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium
  });

  const { loading } = useSettings()

  if (!fontsLoaded || loading ) 
    return <AppLoading />

  return (
      <PasswordProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
        <Routes/>
        <FlashMessage position="bottom" floating={true} />
      </PasswordProvider>
  );
}