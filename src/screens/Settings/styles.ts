import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shapes};
  padding-bottom: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
export const Separator = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.colors.line};

  border-left-color: ${({ theme }) => theme.colors.shapes};
  border-right-color: ${({ theme }) => theme.colors.shapes};
  border-left-width:  ${RFValue(32)}px;
  border-right-width:  ${RFValue(32)}px;
`;
export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: ${RFValue(15)}px;
  font-family: 'Rubik_500Medium';
  color: ${({ theme }) => theme.colors.title};
  margin: ${RFValue(15)}px 0;
`;
