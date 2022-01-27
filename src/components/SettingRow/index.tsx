import React from 'react';

import { Feather } from '@expo/vector-icons';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Content,
  Icon,
  Title,
  Subtitle,
  Accessory,
} from './styles';

interface Props extends RectButtonProps {
  iconName: React.Component<typeof Feather>['name']
  title: string
  subtitle?: string
}

export function SettingRow({iconName, title, subtitle, ...rest}: Props) {
  const { colors } = useTheme()

  return (
    <Container {...rest}>
     <Content>
        <Icon name={iconName} color={colors.title}/>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
     </Content>
     <Accessory>

     </Accessory>
    </Container>
  );
}