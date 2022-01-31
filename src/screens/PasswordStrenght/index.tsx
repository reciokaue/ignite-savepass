import React, { useState,  } from 'react';

import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';

import zxcvbn from 'zxcvbn';
import { secondsToHours } from 'date-fns'

import {
  Container,
  Form,
  ButtonBox,
  FormInput,
  Title,
} from './styles';
import { useTheme } from 'styled-components';
import { PasswordCheck } from '../../components/Form/PasswordCheck';

interface PasswordPropertiesData{
  strenghtLevel: number
  statusColor: string
  secondsToHack: number
}

const objectDefault = {
  strenghtLevel: 0,
  statusColor: '#EBEBEB',
  secondsToHack: 0
}

export function PasswordStrenght() {
  const [ passwordText, setPasswordText ] = useState('')
  const [ passwordProperties, setPasswordProperties ] = useState<PasswordPropertiesData>(objectDefault)

  async function updatePasswordStatus(text: string){
    setPasswordText(text)

    if(text == ''){
      setPasswordProperties(objectDefault)
    }else{
      const data = await zxcvbn(passwordText)
      let actualColor = 
        data.score == 4 ?'#90BE6D':
        data.score == 3 ?'#409FFF':
        data.score == 2 ?'#F9C74F':
                         '#EE8B9B'
  
      const object = {
        strenghtLevel: data.score,
        statusColor: actualColor,
        secondsToHack: data.crack_times_seconds.offline_fast_hashing_1e10_per_second
      }
      setPasswordProperties(object)
    }
  }
  
  return (
    // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Header back title='Detalhe da senha' />
          <Container>
            {/* <Form>
              <FormInput
                onChangeText={setPasswordText}
                value={passwordText}
                placeholderTextColor={colors.text}
              />
              <Title>{daysToCrack} dias para desencriptar sua senha</Title>
              <ButtonBox>
                <Button onPress={handleTestPassword} title='Test' backColor={'#1967FB'}/>
              </ButtonBox>
            </Form> */}

            <PasswordCheck 
              onChange={updatePasswordStatus}
              textValue={passwordText}
              title="Generete your Password"
              statusColor={passwordProperties.statusColor}
              strenghtLevel={passwordProperties.strenghtLevel}
              secondsToHack={passwordProperties.secondsToHack}
            />
          </Container>
        </>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  )
}
