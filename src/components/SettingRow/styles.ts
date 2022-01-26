import styled from 'styled-components/native';

import Feather from '@expo/vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${RFValue(21)}px ${RFValue(32)}px;
`;
export const Content= styled.View`
  flex-direction: row;
  align-items: center;
`
export const Title= styled.Text`
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(14)}px;
  color:  ${({ theme }) => theme.colors.title};
  margin: 0 ${RFValue(15)}px;
`
export const Subtitle= styled.Text`
  font-family: 'Rubik_400Regular';
  font-size: ${RFValue(10)}px;
  color:  ${({ theme }) => theme.colors.text};
`
export const Accessory= styled.View`

`
export const Icon = styled(Feather).attrs({
  size: 24,
})`
  opacity: 0.6;
`;
