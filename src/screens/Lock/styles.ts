import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #1967FB;
  padding: ${RFValue(24)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: #e3e4e5;
  font-weight: bold;
  font-family: 'Rubik_400Regular';
`;
export const Wrapper = styled.View`
  height: ${RFValue(300)}px;
  width: 100%;
  margin-bottom: ${RFValue(-20)}px;
`;
export const NumpadBox = styled.FlatList.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})``;
export const Password = styled.Text`
  padding: ${RFValue(12)}px ${RFValue(32)}px;
  margin: ${RFValue(32)}px ${RFValue(32)}px ${RFValue(16)}px;
  border-bottom-color: #e3e4e5;
  border-bottom-width: 1.5px;
  
  font-size: ${RFValue(22)}px;
  color: #e3e4e5;
  text-align: center;
`;
export const NumberContainer = styled(BorderlessButton)`
  padding: ${RFValue(15)}px;
  margin: ${RFValue(-5)}px ${RFValue(15)}px;
  justify-content: center;
  align-items: center;
`;
export const NumberText = styled.Text`
  padding: ${RFValue(12)}px;
  font-size: ${RFValue(22)}px;
  color: #e3e4e5;
  font-weight: bold;
  font-family: 'Rubik_500Medium';
`;
