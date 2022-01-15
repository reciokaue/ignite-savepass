import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  ButtonText
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  backColor?: string
  onPress?: () => void
}

export function Button({
  title,
  backColor,
  onPress,
  ...rest
}: Props) {
  return (
    <Container onPress={onPress} style={{backgroundColor: backColor? backColor: '#1967FB'}} {...rest}>
      <ButtonText>
        {title}
      </ButtonText>
    </Container>
  );
}