import React, { useState } from 'react';
import { View } from 'react-native';

import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {
  Wrapper,
  Container,
  ButtonText,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string
  onPress?: any
}

export function OptionButton({
  title, color, onPress, ...rest
}: Props) {
  const [ active, setActive ] = useState(false)
  const { colors } = useTheme()

  function handleToggleStates(){
    setActive(!active)
    onPress(title)
  }

  return (
    <View style={[{
      width: RFValue(70),
      height: RFValue(70),
      backgroundColor: colors.line,
      borderRadius: 7,
      borderWidth: 4,
      borderColor: active? color: '#0000'
    }]}>
      <Container onPress={handleToggleStates}  {...rest}>
        <ButtonText>
          {title}
        </ButtonText>
      </Container>
  
    </View>
  );
}