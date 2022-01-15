import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #1967FB;
  padding: ${RFValue(24)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  text-align: center;
  color: #e3e4e5;
  font-weight: bold;
  font-family: 'Rubik_500Medium';
  margin-bottom: ${RFValue(59)}px;
`;
export const Box = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(20)}px;
  margin-top: ${RFValue(147)}px;
`;
export const ButtonContainer = styled(RectButton)`
  align-items: center;
  justify-content: center;

  width: 45%;
  padding: ${RFValue(23)}px;

  background: #93B8FF;
  border-radius: 5px;
`;
export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  color: #fff;
  font-family: 'Rubik_500Medium';
`;
