import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { SavepassRoutes } from './stack.routes'

export function Routes(){
  return (
    <NavigationContainer>
      <SavepassRoutes/>
    </NavigationContainer>
  )
}