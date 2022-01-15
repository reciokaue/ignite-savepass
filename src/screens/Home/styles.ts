import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface LoginListDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
  about?: string
}
export const Container = styled.View`
  flex: 1;
  background-color: #F2F3F5;
  /* padding: 0 ${RFValue(24)}px; */
`;
export const LockButton = styled(RectButton).attrs({
  rippleColor: '#fff',
})`
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  
  position: absolute;
  z-index: 99;
  bottom: ${RFValue(24)}px;
  right: ${RFValue(24)}px;
  
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border-radius: 100px;
  background: #1967FB;

  border-radius: 100px;
`
export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: 'Rubik_500Medium';
  color: #525252;
  margin: ${RFValue(24)}px 0;
`;
export const LoginList = styled(FlatList as new () => FlatList<LoginListDataProps>).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: ${RFValue(-28)}px;
  padding:  ${RFValue(28)}px ${RFValue(24)}px;
`;