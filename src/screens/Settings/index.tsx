import React from 'react';
import { SettingRow } from '../../components/SettingRow';

import {
  Container,
  Separator,
  Title,
} from './styles';

export function Settings() {
  return (
    <Container>
      <Title>Configurações</Title>
      <SettingRow title='Compartilhar app' iconName='share'/><Separator/>
      <SettingRow title='Dark Mode' iconName='sun'/><Separator/>
      <SettingRow title='Trocar senha' iconName='lock'/><Separator/>
      <SettingRow title='Fazer Backup' iconName='server'/><Separator/>
      <SettingRow title='Versão' iconName='git-pull-request'/><Separator/>
      <SettingRow title='Excluir todas as senhas' iconName='alert-triangle'/>
      {/* <SettingRow title='Sair do app' iconName='x-circle'/> */}
    </Container>
  )
}