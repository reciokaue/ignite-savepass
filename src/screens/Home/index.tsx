import React, { useState, useCallback, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { PasswordCard } from '../../components/PasswordCard';

import LockPlus from '../../assets/lock-open-plus-outline.svg'
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  Container,
  Title,
  LoginList,
  LockButton,
} from './styles';
import { Settings } from '../Settings';
import { Button } from '../../components/Form/Button';
import { PasswordStrenght } from '../PasswordStrenght';

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
  const [currentModalContent, setCurrentModalContent] = useState('');
  const modalizeRef = useRef<Modalize>(null);

  function handleOpenModal(content: string) {
    setCurrentModalContent(content)
    modalizeRef.current?.open();
  }
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
  }, [modalizeRef]));

  return (
    <>
      <Header passwordCount={searchListData.length} onSettings={() => handleOpenModal('settings')}/>
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
          <LockPlus color="#FFF"/>
        </LockButton>

        <LoginList
          ListHeaderComponent={<><View style={{height: 25}}/>
            <Button onPress={() => handleOpenModal('strenght')} title='Password Strenght'/>
            <Title>Suas senhas</Title>
          </>}
          keyExtractor={(item) => item.id}
          data={searchListData}
          ListFooterComponent={<View style={{height: 90}}/>}
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
      <Modalize ref={modalizeRef} adjustToContentHeight modalStyle={{borderTopLeftRadius: 22, borderTopRightRadius: 22}}>
        {currentModalContent == 'settings'? 
          <Settings loadData={loadData}/>:
          <PasswordStrenght/>
        }
      </Modalize>
    </>
  )
}