import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.shapes};
  /* justify-content: flex-end; */
  padding: ${RFValue(35)}px ${RFValue(24)}px;

`;
export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
  padding: 0 ${RFValue(24)}px ${RFValue(35)}px;
`;
export const ButtonBox= styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin-top: ${RFValue(24)}px;
`;
export const FormInput = styled.TextInput`
  color: ${({ theme }) => theme.colors.input};
  padding: 15px 0px;
  font-size: ${(RFValue(15))}px;
  flex: 1;
  height: 100%;
  border-bottom-color: #1967FB;
  border-bottom-width: 1.5px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: 'Rubik_500Medium';
  color: ${({ theme }) => theme.colors.title};
  margin: ${RFValue(24)}px 0;
`;
