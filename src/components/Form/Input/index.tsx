import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import {
  Container,
  Label,
  Error,
  InputContainer,
  FormInput,
  ToggleShowPassButton,
  Icon
} from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  title?: string;
  error: string;
  editing?: boolean
}

export function Input({
  name,
  control,
  title,
  error,
  editing,
  secureTextEntry,
  ...rest
}: Props) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <Container>
      {title ? <Label>{title}</Label>: null}
      {error && <Error>{error}</Error>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer style={editing? {
            borderLeftColor: '#1967FB',
          }: null}>
            <FormInput
              {...rest}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry && passwordHidden}
              placeholderTextColor="#BABBBF"
              style={!editing? {color: '#BABBBF' }: null}
            />
            {secureTextEntry && (
              <ToggleShowPassButton onPress={() => setPasswordHidden(!passwordHidden)}>
                <Icon name={passwordHidden ? "eye-off" : "eye"} />
              </ToggleShowPassButton>
            )}
          </InputContainer>
        )}
      />
    </Container>
  )
}