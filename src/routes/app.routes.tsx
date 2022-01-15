import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { RegisterLoginData } from '../screens/RegisterLoginData';
import { Lock } from '../screens/Lock';
import { PasswordDetail } from '../screens/PasswordDetail';
import { usePassword } from '../context/passwordContext';

const {
  Navigator,
  Screen
} = createStackNavigator();

export function AppRoutes() {
  const { isLogged, loading } = usePassword()

  return (
    <Navigator initialRouteName='Lock' screenOptions={{headerShown: false}}>
      {!isLogged?  <Screen name="Lock" component={Lock} />: null}
      <Screen name="Home" component={Home} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
      <Screen name="PasswordDetail" component={PasswordDetail} />
    </Navigator>
  );
}