import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider } from 'styled-components/native'

import dark from '../styles/dark'
import light from '../styles/light'

interface SettingsContextData{
  password: string
  theme: string
  started: boolean
  isLogged: boolean
  loading: boolean
  handleStarted: () => Promise<void>
  handleSetPassword: (password: string) => Promise<void>
  // handleSetTheme:  (theme: string) => Promise<void>
  toggleTheme: () => void
  setIsLogged: (state: boolean) => void
  clearData: () => void
}

interface ProviderProps{
  children: ReactNode
}

export const SettingsContext = createContext({} as SettingsContextData)
export function PasswordProvider({children}: ProviderProps){
  const [ password, setPassword ] = useState('')
  const [ isLogged, setIsLogged ] = useState(false)
  const [ started, setStarted ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ theme, setTheme ] = useState('light')

  const startedKey =  '@savepass:started'
  const passwordKey =  '@savepass:password'
  const themeKey =  '@savepass:theme'

  async function handleStarted(){
    try {
      await AsyncStorage.setItem(startedKey, 'true')
      setIsLogged(true)
      setStarted(true)
    } catch (error) {
      console.log(error)
    }
  } 
  async function handleSetPassword(password: string){
    try {
      await AsyncStorage.setItem(passwordKey, password)
      setPassword(password)
      setIsLogged(true)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSetTheme(theme: string){
    try {
      await AsyncStorage.setItem(themeKey, theme)
      setTheme(theme)
    } catch (error) {
      console.log(error)
    }
  }
  async function toggleTheme(){
    if(theme == 'light'){
      await AsyncStorage.setItem(themeKey, 'dark')
      setTheme('dark')
    }else{
      await AsyncStorage.setItem(themeKey, 'light')
      setTheme('light')
    }
  }
  async function clearData(){
    try {
      await AsyncStorage.removeItem(passwordKey)
      await AsyncStorage.removeItem(startedKey)
    } catch(error){
      console.log(error)
    }
  } 
  async function loadData(){
    try {
      const startedData = await AsyncStorage.getItem(startedKey)
      const booleanValue = (startedData == 'true')
      setStarted(booleanValue)
      
      const passwordData = await AsyncStorage.getItem(passwordKey)
      const wasPassword = passwordData ? passwordData: ''
      setPassword(wasPassword)

      const themeData = await AsyncStorage.getItem(themeKey)
      const wasTheme = themeData ? themeData: ''
      setTheme(wasTheme)
      
      if(booleanValue && wasPassword == 'none'){
        setIsLogged(true)
      }
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <SettingsContext.Provider value={{
      password,
      theme,
      started,
      isLogged,
      loading,
      setIsLogged,
      handleStarted,
      handleSetPassword,
      toggleTheme,
      // handleSetTheme,
      clearData
    }}>
      <ThemeProvider theme={theme == 'light'? light: dark}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  )
}

export function useSettings(){
  const context = useContext(SettingsContext)
  return context
}