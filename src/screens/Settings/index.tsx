import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

import { Share, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SettingRow } from '../../components/SettingRow';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useSettings } from '../../context/settingsContext';

import {
  Container,
  Separator,
  Title,
} from './styles';

interface Props{
  loadData?: () => void
}

const SHARE_MESSAGE = 'App incrivel para salvar suas senhas da forma mais segura! Confira o projeto no github'
const LINK_URL = 'https://github.com/reciokaue/ignite-savepass'

export function Settings({loadData}: Props) {
  const [ showAlert, setShowAlert ] = useState(false)

  const { toggleTheme, theme, password } = useSettings()
  const { colors } = useTheme()

  const navigation = useNavigation<any>()
  const dataKey = '@savepass:logins';


  function handleExcludeAllPasswords(){
    AsyncStorage.removeItem(dataKey)
    setShowAlert(false)
    loadData()
  }
  function handleNewPassword(){
    navigation.navigate('ChangePassword', {removePassword: false})
  }
  function handleRemovePassword(){
    if(password != 'none'){
      navigation.navigate('ChangePassword', {removePassword: true})
    }
  }

  async function shareApp(){
    try {
      await Share.share({
        message: `${SHARE_MESSAGE} ${LINK_URL}`,
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
      <Title>Configura????es</Title>
      <SettingRow onPress={shareApp} title='Compartilhar app' iconName='share'/><Separator/>
      <SettingRow onPress={toggleTheme} title={theme == 'dark'? 'Light Mode': 'Dark Mode'} iconName={theme == 'dark'? 'sun': 'moon'}/><Separator/>
      {/* <SettingRow title='Fazer Backup' iconName='server'/><Separator/> */}
      <SettingRow onPress={handleNewPassword} title='Trocar senha' iconName='lock'/><Separator/>
      <SettingRow onPress={handleRemovePassword} title='Excluir senha' iconName='trash-2'/><Separator/>
      <SettingRow title='Vers??o' subtitle='1.3' iconName='git-pull-request'/><Separator/>
      <SettingRow onPress={() => setShowAlert(true)} title='Excluir todas as senhas' iconName='alert-triangle'/>
      {/* <SettingRow title='Sair do app' iconName='x-circle'/> */}

      <AwesomeAlert
        show={showAlert}
        title="Deseja mesmo excluir todas as senhas?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="N??o"
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

