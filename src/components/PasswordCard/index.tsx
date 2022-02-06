import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Clipboard } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

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
  function handleGoToDetail(){
    navigate({name: 'PasswordDetail', params: {
      service_name: service_name,
      email: email,
      password: password,
      item_id: item_id,
      about: about
    }})
  }
  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Clipboard.setString(password)
      showMessage({
        message: "Sua senha foi copiada!",
        type: "info",
        backgroundColor: '#1967FB',
        titleStyle: {textAlign: 'center', fontSize: 15, padding: 5},
        style: {alignItems: 'center'},
        icon: 'success',
      });
    }
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={onLongPress}
      minDurationMs={600}>
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
    </LongPressGestureHandler>
  );
}