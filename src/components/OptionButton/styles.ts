import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled.View`
  width: ${(RFValue(70))}px;
  height: ${(RFValue(70))}px;
  background: ${({ theme }) => theme.colors.line};

  border-radius: 7px;
  border-width: 4px;
`
export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 6px;
`;
export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: 'Rubik_500Medium';
  font-size: ${(RFValue(32))}px;
`;