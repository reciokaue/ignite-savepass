import React from 'react';
import { TextInputProps } from 'react-native';

import {
  Wrapper,
  Container,
  Input,
  Button,
  Icon,
  FakeBackground,
} from './styles';

interface SearchBarProps extends TextInputProps {
  onSearchButtonPress: () => void;
}

export function SearchBar({
  style,
  onSearchButtonPress,
  ...rest
}: SearchBarProps) {
  return (
    <Wrapper>
      <Container style={{elevation: 20}}>
        <Input {...rest} placeholderTextColor='#B2B2B2'/>
        <Button onPress={onSearchButtonPress} testID="search-button">
          <Icon name="search" />
        </Button>
      </Container>
      <FakeBackground/>
    </Wrapper>
  )
}