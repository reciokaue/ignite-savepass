import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { usePassword } from '../context/passwordContext'
import { StartRoutes } from './presentation.routes'
import { SavepassRoutes } from './stack.routes'

export function Routes(){
  const { started } = usePassword()
  return (
    <NavigationContainer>
      {/* {started? 
        <AppRoutes/>:
        <StartRoutes/>
      } */}
      <SavepassRoutes/>
    </NavigationContainer>
  )
}