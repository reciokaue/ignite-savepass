import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Alert } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Wrapper,
  Container,
  ShowPasswordButton,
  Icon,
  Info,
  Title,
  Password,
  BoldTitle,
  Email,
} from './styles';

interface Props {
  service_name: string;
  email: string;
  password: string;
  item_id: string;
  about?: string
}

export function PasswordCard({service_name, email, password, item_id, about = ''}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  const { navigate } = useNavigation();
  const { colors } = useTheme()

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }
  function handleDelete(){
    Alert.alert('deseja mesmo excluir?')
  }
  function handleGoToDetail(){
    navigate({name: 'PasswordDetail', params: {
      service_name: service_name,
      email: email,
      password: password,
      item_id: item_id,
      about: about
    }})
  }
  return (
  <Wrapper colors={[passIsVisible? colors.visiblePass: colors.shapes, colors.shapes]}>
    <Container onPress={handleGoToDetail} >
      <Info>
        {passIsVisible ? <Title>{service_name}</Title>: <BoldTitle>{service_name}</BoldTitle>}
        {passIsVisible ? <Password>{password}</Password>: <Email>{email}</Email>}
      </Info>
      <ShowPasswordButton onPress={handleTogglePassIsVisible}>
        <Icon
          size={30}
          name={passIsVisible ? "eye" : "eye-off"}
          color={passIsVisible ? '#1967FB' : '#888D97'}
        />
      </ShowPasswordButton>
      </Container>
    </Wrapper>
  );
}