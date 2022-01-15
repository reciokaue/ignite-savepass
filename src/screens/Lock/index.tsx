import React, { useEffect, useState } from 'react';

import * as LocalAuthentication from 'expo-local-authentication';

import {
  Container,
  Title,
  Wrapper,
  NumpadBox,
  Password,
  NumberContainer,
  NumberText,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePassword } from '../../context/passwordContext';

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'remove', 0, 'go']

export function Lock() {
  const [ newPassword, setNewPassword ] = useState('')
  const [ isVisible, setIsVisible ] = useState(false)

  const [compatible, isCompatible] = useState(false);
  const [fingerPrints, setFingerPrints] = useState(false);
  
  const { navigate } = useNavigation();
  const { password, started, handleSetPassword, handleStarted, setIsLogged } = usePassword()
  
  useEffect(()=>{
    checkDeviceForHardware();
    checkForFingerprints();
  },[])
  
   async function checkDeviceForHardware(){
      let compatible = await LocalAuthentication.hasHardwareAsync();
      isCompatible(compatible);
   }
   async function checkForFingerprints(){
       let fingerprints = await LocalAuthentication.isEnrolledAsync();
       setFingerPrints( fingerprints );
     };
   async function scanFingerprint(){
      await LocalAuthentication.authenticateAsync()
      .then(res=>{
          if(res.success === true){
            loginSucess() 
            setIsLogged(true)
      }})
   };
   
   
   async function handleRegister() {
    if(started ){
      console.log('NEW PASSWORD', newPassword)
      console.log('PASSWORD', password)
      if( newPassword === password){
        loginSucess()
        setIsLogged(true)
      }
    }
    if(!started && newPassword.length >= 4){
      handleSetPassword(newPassword)
      handleStarted()
      loginSucess()
    }
  }
  function loginSucess(){
    navigate('Home')
  }
    

  return (
    <Container>
      <Title>Digite sua {!started? 'nova ': null}senha</Title>
      <Password>
        {isVisible? newPassword: '#'.repeat(newPassword.length)}
      </Password>
      <NumberContainer onPress={() => setIsVisible(!isVisible)}>
        {isVisible? <AntDesign name="eyeo" size={24} color="#e3e4e5"/>:
          <MaterialCommunityIcons name="eye-off-outline" size={24} color="#e3e4e5" />
        }
      </NumberContainer>
      <Wrapper>
        <NumpadBox
          scrollEnabled={false}
          numColumns={3}
          data={num}
          keyExtractor={num => String(num)}
          renderItem={({item}) => (
            <NumberContainer onPress={() => {
                item == 'go' && handleRegister()
                item == 'remove' ? setNewPassword(newPassword.slice(0, -1)):
                item != 'go' && setNewPassword(newPassword + item)
            }}>
              {item !== 'go' && item !== 'remove' && <NumberText>{item}</NumberText>}
              
              {item == 'remove' && <MaterialCommunityIcons name="tray-remove" size={32} color="#e3e4e5" />}
              {item == 'go' && <AntDesign name="login" size={32} color="#e3e4e5" />}
            </NumberContainer>
          )}
        />
      </Wrapper>
      {started? 
        <NumberContainer onPress={() => scanFingerprint()}>
          <MaterialCommunityIcons  name="fingerprint" size={70} color="#e3e4e5" />
        </NumberContainer>: <View style={{height: 100}}/>}
    </Container>
  )
}