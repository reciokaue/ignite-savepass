import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Presentation } from '../screens/Presentation';
import { Question } from '../screens/Question';
import { Lock } from '../screens/Lock';

const { Navigator, Screen } = createStackNavigator();

export function StartRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Presentation" component={Presentation} />
      <Screen name="Question" component={Question} />
      <Screen name="Lock" component={Lock} />
    </Navigator>
  );
}