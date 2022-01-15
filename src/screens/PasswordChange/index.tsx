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
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Lock() {
  const [ password, setPassword ] = useState('')
  const [ isVisible, setIsVisible ] = useState(false)

  const [compatible, isCompatible] = useState(false);
  const [fingerPrints, setFingerPrints] = useState(false);

  const { navigate } = useNavigation();

  useEffect(()=>{
      checkDeviceForHardware();
      checkForFingerprints();
   },[])

   async function checkDeviceForHardware(){
      let compatible = await LocalAuthentication.hasHardwareAsync();
      isCompatible(compatible);
      console.log('compatible',compatible);
   }

   async function checkForFingerprints(){
       let fingerprints = await LocalAuthentication.isEnrolledAsync();
       setFingerPrints( fingerprints );
       console.log('fingerPrints', fingerprints)
     };

   async function scanFingerprint(){
      await LocalAuthentication.authenticateAsync()
      .then(res=>{
          if(res.success === true){
            loginSucess()
      }})
   };
   function loginSucess(){
    navigate('Home')
   }
  
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'remove', 0, 'go']

  function handleReset(){
    for (let index = 0; index < password.length; index++) {
      setTimeout(function timer() {
        password.slice(0, -1)
      }, 700);
    }
  }


  return (
    <Container>
      <Title>A</Title>
      <Password>
        {isVisible? password: '#'.repeat(password.length)}
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
            // <LongPressGestureHandler minDurationMs={700} onHandlerStateChange={handleReset}>
              <NumberContainer onPress={() => {
                  item == 'go' && password == '39542932855' && loginSucess()
                  item == 'remove' ? setPassword(password.slice(0, -1)):
                  item != 'go' && setPassword(password + item)
              }}>
                {item !== 'go' && item !== 'remove' && <NumberText>{item}</NumberText>}
                
                {item == 'remove' && <MaterialCommunityIcons name="tray-remove" size={32} color="#e3e4e5" />}
                {item == 'go' && <AntDesign name="login" size={32} color="#e3e4e5" />}
              </NumberContainer>
            // </LongPressGestureHandler>
          )}
        />
      </Wrapper>
      <NumberContainer onPress={ () => scanFingerprint()}>
        <MaterialCommunityIcons  name="fingerprint" size={70} color="#e3e4e5" />
      </NumberContainer>
    </Container>
  )
}