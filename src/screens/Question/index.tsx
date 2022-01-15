import React from 'react';

import {
  Container,
  Title,
  Box,
  ButtonContainer,
  ButtonText,
} from './styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { usePassword } from '../../context/passwordContext';

export function Question() {
  const { navigate } = useNavigation();
  
  const { handleSetPassword, handleStarted } = usePassword()

  function handleGoLock(){
    navigate('Lock')
  }
  function handleGoApp(){
    handleSetPassword('none')
    handleStarted()
  }
  return (
    <Container>
      <Title>Deseja trancar{'\n'}seu aplicativo?</Title>
      <MaterialCommunityIcons name="lock-question" size={147} color="#fff" />
      <Box>
        <ButtonContainer onPress={handleGoApp} style={{backgroundColor: '#3D7FFD'}}>
          <ButtonText>Não</ButtonText>
        </ButtonContainer>
        <ButtonContainer onPress={handleGoLock}>
          <ButtonText>Sim</ButtonText>
        </ButtonContainer>
      </Box>
    </Container>
  )
}