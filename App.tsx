import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';

import AppLoading from 'expo-app-loading';
import { PasswordProvider, usePassword } from './src/context/passwordContext';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium
  });

  const { loading } = usePassword()

  useEffect(() => {
    console.log(loading)
  }, [loading])

  if (!fontsLoaded || loading) {
    return <AppLoading />
  }else{
    return (
      <PasswordProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
        <Routes/>
      </PasswordProvider>
    );
  }
  
}