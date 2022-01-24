import React from 'react';

import {
  Container,
  Title,
  Hero,
  ButtonContainer,
  ButtonText,
} from './styles';

import KeyHero from '../../assets/Key-rafiki.png'
import { useNavigation } from '@react-navigation/native';

export function Presentation() {
  const { navigate } = useNavigation();

  function handleGoQuestion(){
    navigate('Question')
  }

  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Title>Vamos começar</Title>
      <Hero source={KeyHero}/>
      <ButtonContainer onPress={handleGoQuestion} style={{backgroundColor: '#3D7FFD'}}>
        <ButtonText>Vamos lá</ButtonText>
      </ButtonContainer>
    </Container>
  )
}