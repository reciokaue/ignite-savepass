import React, { useState } from 'react';

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

import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../../context/settingsContext';
import { Header } from '../../components/Header';

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'remove', 0, 'go']

export function ChangePassword() {
  const [ newPassword, setNewPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isVisible, setIsVisible ] = useState(false)
  
  const { navigate } = useNavigation();
  const { handleSetPassword } = useSettings()
  
  async function handleRegister() {
    if(newPassword.length >= 4){
      handleSetPassword(newPassword)
      navigate('Home')
    }else[
      setErrorMessage('A senha deve conter no mínimo 4 caracteres')
    ]
  }
  return (<>
    <Header back/>
    <Container>
      <Title>Digite sua nova senha</Title>
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
                item == 'remove'? setNewPassword(newPassword.slice(0, -1)):
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
    </Container></>
  )
}