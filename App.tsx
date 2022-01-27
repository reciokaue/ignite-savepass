import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';

import AppLoading from 'expo-app-loading';
import { PasswordProvider, useSettings } from './src/context/settingsContext';
import { Routes } from './src/routes';

import { ThemeProvider } from 'styled-components/native';
import light from './src/styles/light';
import dark from './src/styles/dark';

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
      </PasswordProvider>
  );
}