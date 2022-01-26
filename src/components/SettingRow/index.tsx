import React from 'react';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  Content,
  Icon,
  Title,
  Subtitle,
  Accessory,
} from './styles';

interface Props {
  iconName: React.Component<typeof Feather>['name']
  title: string
  subtitle?: string
}

export function SettingRow({iconName, title, subtitle}: Props) {
  return (
    <Container>
     <Content>
        <Icon name={iconName}/>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
     </Content>
     <Accessory>

     </Accessory>
    </Container>
  );
}