import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Button,
  Title,
  Amount,
  Bold,
  RightSide,
  LeftSide,
  MiddleSide,
  Box,
  Row,
} from './styles';

import Key from '../../assets/key.svg'
import { useSettings } from '../../context/settingsContext';

interface Props{
  title?: string
  back?: boolean
  passwordCount?: number
  onSettings?: () => void
}

export function Header({title, back = false, passwordCount, onSettings}: Props) {
  const { goBack } = useNavigation();
  const { clearData } = useSettings()

  function handleAddPass() {
    goBack()
  }

  return (
    <Container>
      <LeftSide>{!back ?
        <Button onPress={clearData} ><Key/></Button>:
        <Button onPress={goBack}><Feather name="chevron-left" size={24} color="#FFF" /></Button>}
      </LeftSide>
      <MiddleSide>
        <Title>{title}</Title>
      </MiddleSide>
      <RightSide>{back ?
        <Box><Key/></Box>:
        <ConfigNav/>}
      </RightSide>
    </Container>
  );
  function ConfigNav(){
    return (
      <Row>
        <Row><Amount>Você tem <Bold>{passwordCount} {passwordCount == 1? 'senha': 'senhas'}</Bold></Amount></Row>
        <Button onPress={onSettings}><Feather name="settings" size={24} color="#FFF" /></Button>
      </Row>
    )
  }
}