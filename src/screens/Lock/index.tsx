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
  ErrorMessage,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSettings } from '../../context/settingsContext';

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'remove', 0, 'go']

export function Lock() {
  const [ newPassword, setNewPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isVisible, setIsVisible ] = useState(false)

  const [compatible, isCompatible] = useState(false);
  const [fingerPrints, setFingerPrints] = useState(false);
  
  const { navigate } = useNavigation();
  const { password, started, handleSetPassword, handleStarted, setIsLogged } = useSettings()

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
      if( newPassword === password){
        loginSucess()
        setIsLogged(true)
      }else{
        setErrorMessage('Senha incorreta')
      }
    }
    if(!started){
      if(newPassword.length >= 4){
        handleSetPassword(newPassword)
        handleStarted()
        loginSucess()
      }else{
        setErrorMessage('A senha deve conter no mínimo 4 caracteres')
      }
    }
  }
  function loginSucess(){
    navigate('Home')
  }

  return (
    <Container>
      <Title>Digite sua {!started ? 'nova ': null}senha</Title>
      <Password>
        {isVisible? newPassword: '#'.repeat(newPassword.length)}
      </Password>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <NumberContainer onPress={() => setIsVisible(!isVisible)}>
        {isVisible? <AntDesign name="eyeo" size={24} color="#e3e4e5"/>:
          <MaterialCommunityIcons name="eye-off-outline" size={24} color="#e3e4e5" />}
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
                item != 'go' && newPassword.length < 36 && setNewPassword(newPassword + item)
                newPassword.length >= 36 && setErrorMessage('A senha não pode ser tão grande')
            }}>

              {item !== 'go' && item !== 'remove' && <NumberText>{item}</NumberText>}
              {item == 'remove' && <MaterialCommunityIcons name="tray-remove" size={32} color="#e3e4e5" />}
              {item == 'go' && <AntDesign name="login" size={32} color="#e3e4e5" />}
            </NumberContainer>
          )}
        />
      </Wrapper>
      {started && compatible && fingerPrints?
        <NumberContainer onPress={() => scanFingerprint()}>
          <MaterialCommunityIcons  name="fingerprint" size={70} color="#e3e4e5" />
        </NumberContainer>: <View style={{height: 100}}/>}
    </Container>
  )
}