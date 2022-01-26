import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { SettingRow } from '../../components/SettingRow';
import { useSettings } from '../../context/settingsContext';

import {
  Container,
  Separator,
  Title,
} from './styles';

interface Props{
  loadData?: () => void
}

export function Settings({loadData}: Props) {
  const [ showAlert, setShowAlert ] = useState(false)

  const { toggleTheme, theme } = useSettings()
  const { colors } = useTheme()

  const dataKey = '@savepass:logins';

  function handleExcludeAllPasswords(){
    AsyncStorage.removeItem(dataKey)
    setShowAlert(false)
    loadData()
  }

  async function shareApp(){
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
    } catch (error) {
      alert(error.message);
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: RFValue(30),
      paddingBottom: RFValue(29),
      paddingHorizontal: RFValue(32),
      backgroundColor: colors.background,
      marginTop: -50
    },
    textButton: {
      fontSize: RFValue(14),
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Rubik_500Medium',
    },
    title: {
      fontSize: RFValue(20),
      textAlign: 'center',
      color: colors.title,
      fontFamily: 'Rubik_500Medium',
      marginBottom: RFValue(10),
    },
    button: {
      paddingHorizontal: RFValue(43),
      paddingVertical: RFValue(23),
    }
  })

  return (
    <Container>
      <Title>Configurações</Title>
      <SettingRow onPress={shareApp} title='Compartilhar app' iconName='share'/><Separator/>
      <SettingRow onPress={toggleTheme} title={theme == 'light'? 'Light Mode': 'Dark Mode'} iconName={theme == 'light'? 'sun': 'moon'}/><Separator/>
      <SettingRow title='Trocar senha' iconName='lock'/><Separator/>
      <SettingRow title='Fazer Backup' iconName='server'/><Separator/>
      <SettingRow title='Versão' subtitle='1.3' iconName='git-pull-request'/><Separator/>
      <SettingRow onPress={() => setShowAlert(true)} title='Excluir todas as senhas' iconName='alert-triangle'/>
      {/* <SettingRow title='Sair do app' iconName='x-circle'/> */}

      <AwesomeAlert
        show={showAlert}
        title="Deseja mesmo excluir todas as senhas?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Não"
        confirmText="Excluir"
        cancelButtonColor={colors.text}
        confirmButtonColor="#DC1637"
        onCancelPressed={() => setShowAlert(false)}
        onDismiss={() => setShowAlert(false)}
        onConfirmPressed={handleExcludeAllPasswords}
        contentContainerStyle={styles.container}
        overlayStyle={{opacity: 0.9}}
        titleStyle={styles.title}
        cancelButtonStyle={styles.button}
        confirmButtonStyle={styles.button}
        cancelButtonTextStyle={styles.textButton}
        confirmButtonTextStyle={styles.textButton}
      />
    </Container>
  )
}

