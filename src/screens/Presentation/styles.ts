import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(24)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.whiteTitle};
  font-weight: bold;
  font-family: 'Rubik_500Medium';
`;
export const Hero = styled.Image`
  width: ${RFValue(315)}px;
  height: ${RFValue(315)}px;
  margin: ${RFValue(50)}px 0;
`;
export const ButtonContainer = styled(RectButton)`
  align-items: center;
  justify-content: center;

  width: 45%;
  padding: ${RFValue(23)}px;

  background: #93B8FF;
  border-radius: 5px;
  margin-bottom: ${RFValue(20)}px;
`;
export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.whiteTitle};
  font-family: 'Rubik_500Medium';
`;
