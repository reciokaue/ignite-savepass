import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.background};
  /* justify-content: flex-end; */
`;
export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
  padding: 0 ${RFValue(24)}px ${RFValue(35)}px;
`;