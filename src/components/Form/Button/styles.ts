import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  padding: ${RFValue(23)}px ${RFValue(46)}px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export const ButtonText = styled.Text`
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(15)}px;
  /* color: #3D434D; */
  color: ${({ theme }) => theme.colors.whiteTitle};
`;