import React, { useEffect, useState } from 'react';

import { Clipboard } from 'react-native';

import Slider from 'react-native-custom-slider';
import zxcvbn from 'zxcvbn';
// var generator = require('generate-password-browser');
import { generator } from 'ts-password-generator';

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
  BoldText,
  GenerateContainer,
  Amount,
  Option,
} from './styles';

import { useTheme } from 'styled-components';
import { getLevelIcon, getLevelMessage, getTimeFormated, getColor } from './utils'
import { Button } from '../Button';

interface Props {
  title: string
  setText: (text: string) => void
  textValue: string
}
export function PasswordCheck({
  setText, title, textValue
}: Props) {
  const [ strenghtLevel, setStrenghtLevel ] = useState(0)
  const [ statusColor, setStatusColor ] = useState('#EBEBEB')
  const [ secondsToHack, setSecondsToHack ] = useState(0)

  const [ sliderValue, setSliderValue ] = useState(12)

  const [ numbers, setNumbers ] = useState(false)
  const [ uppercase, setUppercase ] = useState(false)
  const [ lowercase, setLowercase ] = useState(true)
  const [ symbols, setSymbols ] = useState(false)

  const { colors } = useTheme()

  function copyToClipboard(){
    Clipboard.setString(textValue)
  }

  const LevelIcon = getLevelIcon(strenghtLevel)
  const LevelMessage = getLevelMessage(strenghtLevel)
  const TimeFormated = getTimeFormated(secondsToHack)

  function updatePasswordStatus(text: string){
    setText(text)
    testPassword(text)
  }
  async function testPassword(text?: string){
    if(textValue == '')
      return setStatusColor('#EBEBF0')

    const data = await zxcvbn(text? text: textValue)

    setStrenghtLevel(data.score)
    setStatusColor(getColor(data.score))
    setSecondsToHack(data.crack_times_seconds.offline_fast_hashing_1e10_per_second)
  }
  function generatePassword(){
    if( !uppercase && !numbers && !lowercase && !symbols){
      setStatusColor('#EBEBF0')
      setStrenghtLevel(0)
      setSecondsToHack(0)
      setText('')
    }else{
      const password = generator({
        charsQty: sliderValue, isUppercase: uppercase, haveNumbers: numbers, haveString: lowercase, haveSymbols: symbols
      })
      setText(password)
      testPassword(password)
    }
  }

  useEffect(() => {
    generatePassword()
  },[sliderValue, uppercase, numbers, lowercase, symbols])

  return (
    <>
      <Title>{title}</Title>
      <InputContainer style={{borderColor: statusColor}}>
        <Input onChangeText={updatePasswordStatus} value={textValue} placeholderTextColor={colors.text}/>
        <ToggleShowPassButton onPress={copyToClipboard}>
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
        <Text>Senha {LevelMessage}</Text>
      </TextLine>
      <TextLine>
        <Text>Tempo para hackear: </Text>
        <BoldText color={statusColor}>{TimeFormated}</BoldText>
      </TextLine>
      <GenerateContainer>
        <TextLine>
          <Amount>{sliderValue}</Amount>
          <Slider
            value={sliderValue}step={1}
            minimumValue={0} maximumValue={50}
            onValueChange={setSliderValue}
            // onSlidingComplete={setSliderValue}

            thumbTintColor={statusColor}
            minimumTrackTintColor={statusColor}
            maximumTrackTintColor={colors.line}

            thumbStyle={{height: 32, width: 32, borderRadius: 16}}
            trackStyle={{height: 8, borderRadius: 10}}
            style={{flex: 1}}
          />
        </TextLine>
        <Text/>
        <Row>
          <Option active={numbers} onPress={() => { setNumbers(!numbers);}} color={statusColor}>1</Option>
          <Option active={uppercase} onPress={() => setUppercase(!uppercase)} color={statusColor}>A</Option>
          <Option active={lowercase} onPress={() => setLowercase(!lowercase)} color={statusColor}>a</Option>
          <Option active={symbols} onPress={() => setSymbols(!symbols)} color={statusColor}>{'&'}</Option>
        </Row>
        <Text/>
        <Button onPress={generatePassword} title='Generate'/>
      </GenerateContainer>
    </>
  )
}