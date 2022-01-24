import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useSettings } from '../context/settingsContext';
import AppLoading from 'expo-app-loading';

import { Presentation } from '../screens/Presentation';
import { Question } from '../screens/Question';
import { Lock } from '../screens/Lock';
import { Home } from '../screens/Home';
import { PasswordDetail } from '../screens/PasswordDetail';
import { RegisterLoginData } from '../screens/RegisterLoginData';

const { Navigator, Screen } = createStackNavigator();

export function SavepassRoutes() {
  const { isLogged, started, loading } = useSettings()

  if(loading){
    return <AppLoading/>
  }

  return (
    <Navigator initialRouteName={!started ? 'Presentation': !isLogged ? 'Lock': 'Home'} screenOptions={{headerShown: false}}>
      {!started ? (<>
        <Screen name="Presentation" component={Presentation} />
        <Screen name="Question" component={Question} />
      </>): null}
      {!isLogged?  <Screen name="Lock" component={Lock} />: null}
      <Screen name="Home" component={Home} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
      <Screen name="PasswordDetail" component={PasswordDetail} />
    </Navigator>
  );
}