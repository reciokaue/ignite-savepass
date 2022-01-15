import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, Platform, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Form
} from './styles';

interface FormData {
  service_name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  service_name: Yup.string().required('Nome do serviço é obrigatório!'),
  email: Yup.string().email('Não é um email válido').required('Email é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
})

export function RegisterLoginData() {
  const { navigate } = useNavigation();
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

  async function handleRegister(formData: FormData) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...formData
    }
    const dataKey = '@savepass:logins';

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const formatedData = [
        ...currentData,
        newLoginData
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData))
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel salvar')
    }
    reset()
    navigate('Home')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <><Header back title='Cadastrar nova senha' />
          <Container>
          <Form>
            <Input editing
              testID="service-name-input"
              placeholder="Nome do serviço"
              name="service_name"
              error={
                errors.service_name && errors.service_name.message
              }
              control={control}
              autoCapitalize="sentences"
              autoCorrect
              />
            <Input editing
              testID="email-input"
              placeholder="E-mail"
              name="email"
              error={
                errors.email && errors.email.message
              }
              control={control}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              />
            <Input editing
              testID="password-input"
              placeholder="Senha"
              name="password"
              error={
                errors.password && errors.password.message
              }
              control={control}
              secureTextEntry
              />
            <View style={{height: 34}}/>
            <Input editing
              testID="about-input"
              placeholder="Sobre (opcional)"
              name="about"
              error={undefined}
              control={control}
              multiline
              numberOfLines={4}
              style={{textAlignVertical: 'top'}}
            />

            <Button
              title="Salvar"
              backColor='#1967FB'
              onPress={handleSubmit(handleRegister)}
            />
          </Form>
        </Container></>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}