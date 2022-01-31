import React, { useState } from 'react';
import { TextInputProps, View } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import {
  Title,
  InputContainer,
  Row,
  Input,
  ToggleShowPassButton,
  Icon,
  ProgressBar,
  TextLine,
  Text,
  BoldText
} from './styles';
import { useTheme } from 'styled-components';

interface Props {
  title: string
  onChange: (text: string) => void
  textValue: string
  strenghtLevel: number
  statusColor: string
  secondsToHack: number
}

export function PasswordCheck({
  onChange, title, textValue, strenghtLevel, statusColor, secondsToHack
}: Props) {
  const { colors } = useTheme()

  let LevelIcon = 
    strenghtLevel == 4 ?'check-circle':
    strenghtLevel == 3 ?'plus-circle':
    strenghtLevel == 2 ?'minus-circle':
    strenghtLevel == 1 ?'arrow-down-circle':'alert-circle'

  let LevelMessage = 
    strenghtLevel == 4 ?'Strong':
    strenghtLevel == 3 ?'Secure':
    strenghtLevel == 2 ?'Medium':
    strenghtLevel == 1 ?'Weak':'No'

  let TimeFormated = 
    secondsToHack/(60*60*24*30.25*12*1000) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*1000))} millennium`:
    secondsToHack/(60*60*24*30.25*12*100) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*100))} century`:
    secondsToHack/(60*60*24*30.25*12*10) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*10))} decades`:
    secondsToHack/(60*60*24*30.25*12) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12))} Years`:
    secondsToHack/(60*60*24*30.25) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25))} months`:
    secondsToHack/(60*60*24*7) >= 1 ? `${Math.round(secondsToHack/(60*60*24*7))} weeks`:
    secondsToHack/(60*60*24) >= 1 ? `${Math.round(secondsToHack/(60*60*24))} days`:
    secondsToHack/(60*60) >= 1 ? `${Math.round(secondsToHack/(60*60))} hours`:
    secondsToHack/60 >= 1 ? `${Math.round(secondsToHack/60)} minutes`: `${secondsToHack.toFixed(2)} seconds`

  return (
    <>
      <Title>{title}</Title>
        <InputContainer style={{
          borderColor: statusColor,
        }}>
          <Input
            onChangeText={onChange}
            value={textValue}
            placeholderTextColor={colors.text}
          />
          <ToggleShowPassButton onPress={() => {}}>
            <Icon name="copy" color={statusColor}/>
          </ToggleShowPassButton>
        </InputContainer>
        <Row>
          <ProgressBar active={strenghtLevel >= 1} color={statusColor}/>
          <ProgressBar active={strenghtLevel >= 2} color={statusColor}/>
          <ProgressBar active={strenghtLevel >= 3} color={statusColor}/>
          <ProgressBar active={strenghtLevel >= 4} color={statusColor}/>
        </Row>
        <TextLine>
          <Icon style={{marginRight: 10}} name={LevelIcon} color={statusColor}/>
          <Text>{LevelMessage} password</Text>
        </TextLine>
        <TextLine>
          <Text>Time to hack: </Text>
          <BoldText color={statusColor}>{TimeFormated}</BoldText>
        </TextLine>
    </>
  )
}