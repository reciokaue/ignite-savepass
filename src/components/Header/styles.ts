import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary};
  padding: ${getStatusBarHeight()}px 0 0;
  z-index: 0;
`;
export const Button = styled(BorderlessButton).attrs({
  rippleColor: '#fff'
})`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;
export const Box = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;
export const LeftSide = styled.View`
  min-width: 20%;
  padding: ${RFValue(16)}px ${RFValue(10)}px ${RFValue(16)}px ${RFValue(12)}px;
  align-items: flex-end;
  justify-content: center;
`;
export const RightSide = styled.View`
  min-width: 20%;
  padding: ${RFValue(16)}px ${RFValue(15)}px ${RFValue(16)}px ${RFValue(10)}px;
  align-items: flex-start;
  justify-content: center;
`;
export const MiddleSide = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: 'Rubik_500Medium';
  color: ${({ theme }) => theme.colors.whiteTitle};
  margin: auto;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Amount = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: 'Rubik_400Regular';
  color: ${({ theme }) => theme.colors.whiteTitle};
  margin-right: 12px;
`;
export const Bold = styled.Text`
  font-family: 'Rubik_500Medium';
`;