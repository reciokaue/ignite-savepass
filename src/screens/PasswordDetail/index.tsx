import React, { useEffect, useState,  } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, Platform, View, TouchableWithoutFeedback, Keyboard, ScrollView, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
  Container,
  Form,
  ButtonBox
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface FormData {
  item_id: string
  service_name: string;
  email: string;
  password: string;
  about?: string
}

const schema = Yup.object().shape({
  service_name: Yup.string().required('Nome do serviço é obrigatório!'),
  email: Yup.string().email('Não é um email válido').required('Email é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
})

export function PasswordDetail() {
  const [ showAlert, setShowAlert ] = useState(false)
  const [ editable, setEditable ] = useState(false)

  const { navigate } = useNavigation();
  
  const route = useRoute()
  const { 
    service_name,
    email,
    password,
    item_id,
    about,
  } = route.params as FormData

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({
      service_name: service_name,
      email: email,
      password: password,
      id: item_id,
      about: about,
    })
  }, [])

  async function editPassword(formData: FormData) {
    console.log('salvando')
    const dataKey = '@savepass:logins';
    try {
      const newData = []
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      currentData.map((item) => {
        if(item.id == item_id){
          newData.push({
            ...formData
          })
          console.log('NewData', newData)
        }else{
          newData.push(item)
        }
      })
      if(newData != currentData){
        await AsyncStorage.setItem(dataKey, JSON.stringify(newData))
      }   
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel salvar')
    }
    setEditable(false)    
    setShowAlert(false)
    navigate('Home')
  }
  async function DeletePassword(){
    const dataKey = '@savepass:logins';

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const formatedData = currentData.filter((item) => {
        return item.id != item_id
      })
      await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData))
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel deletar')
    }
    reset()
    navigate('Home')
  }
  function handleToggleEdit(){
    setEditable(!editable)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Header back title='Detalhe da senha' />
          <Container>
            <Form>
              <Input
                title='Nome do serviço'
                testID="service-name-input"
                placeholder="Nome do serviço"
                name="service_name"
                error={errors.service_name && errors.service_name.message}
                control={control}
                autoCapitalize="sentences"
                autoCorrect
                editable={editable} editing={editable}
              />
              <Input
                title="E-mail"
                testID="email-input"
                placeholder="E-mail"
                name="email"
                error={errors.email && errors.email.message}
                control={control}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={editable} editing={editable} 
              />
              <Input
                title="Senha"
                testID="password-input"
                placeholder="Senha"
                name="password"
                error={errors.password && errors.password.message}
                control={control}
                secureTextEntry
                editable={editable} editing={editable} 
              />
              <Input
                title="Sobre"
                testID="about-input"
                placeholder="Sobre (opcional)"
                name="about"
                error={undefined}
                control={control}
                style={{textAlignVertical: 'top'}}
                editable={editable} editing={editable} multiline
              />
              <ButtonBox>
                {editable? 
                  <Button onPress={handleSubmit(editPassword)} title='Salvar' backColor='#1967FB'/>:
                  <Button onPress={handleToggleEdit} title='Editar' backColor='#BABBBF'/>
                }
                {editable? 
                  <Button onPress={handleToggleEdit} title='Cancelar' backColor='#BABBBF'/>:
                  <Button title="Excluir" onPress={() => setShowAlert(true)} backColor='#DC1637'/>
                }
              </ButtonBox>
            </Form>
              <AwesomeAlert
                show={showAlert}
                title="Deseja mesmo excluir?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Excluir"
                cancelButtonColor="#BABBBF"
                confirmButtonColor="#DC1637"
                onCancelPressed={() => setShowAlert(false)}
                onDismiss={() => setShowAlert(false)}
                onConfirmPressed={DeletePassword}
                contentContainerStyle={styles.container}
                overlayStyle={{opacity: 0.9}}
                titleStyle={styles.title}
                cancelButtonStyle={styles.button}
                confirmButtonStyle={styles.button}
                cancelButtonTextStyle={styles.textButton}
                confirmButtonTextStyle={styles.textButton}
            />
          </Container>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: RFValue(30),
    paddingBottom: RFValue(29),
    paddingHorizontal: RFValue(32),
    backgroundColor: '#FFF'
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
    color: '#000',
    fontFamily: 'Rubik_500Medium',
    marginBottom: RFValue(27),
  },
  button: {
    paddingHorizontal: RFValue(43),
    paddingVertical: RFValue(23),
  }
})