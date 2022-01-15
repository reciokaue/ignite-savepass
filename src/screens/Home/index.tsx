import React, { useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { PasswordCard } from '../../components/PasswordCard';

import LockPlus from '../../assets/lock-open-plus-outline.svg'

import {
  Container,
  Title,
  LoginList,
  LockButton,
} from './styles';
import { Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
  about?: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);
  
  const { navigate } = useNavigation();

  function handleAddPassword() {
    navigate('RegisterLoginData');
  }

  async function loadData() {
    const dataKey = '@savepass:logins';

    const response = await AsyncStorage.getItem(dataKey)
    const passwords = response ? JSON.parse(response): []
    setData(passwords)
    setSearchListData(passwords)
    setSearchText('')
  }

  function handleFilterLoginData() {
    if(searchText == ''){
      setSearchListData(data)
      return
    }
    const passwordFiltred = data.filter((item: LoginDataProps) => 
      item.service_name.toLowerCase().includes(searchText.toLowerCase()) 
    )
    setSearchListData(passwordFiltred)
    if(!passwordFiltred){
      setSearchListData(data)
    }
  }

  function handleChangeInputText(text: string) {
    setSearchText(text)
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  return (
    <>
      <Header passwordCount={searchListData.length}/>
      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}
          onSearchButtonPress={handleFilterLoginData}
        />
        <LockButton onPress={handleAddPassword}>
          <LockPlus/>
        </LockButton>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          ListHeaderComponent={<Title key="uSDVFBAFKSQAlYcWWRtYl8cxI8QSRvhD">Suas senhas</Title>}
          ListFooterComponent={<View key="8RAUmWIVYjyWcJ8hqtVuZZLDgrbP05MW" style={{height: 90}}/>}
          renderItem={({ item: loginData }) => {
            return <PasswordCard
              item_id={loginData.id}
              service_name={loginData.service_name}
              email={loginData.email}
              password={loginData.password}
              about={loginData.about}
            />
          }}
        />
      </Container>
    </>
  )
}