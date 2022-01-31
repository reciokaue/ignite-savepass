import styled from 'styled-components/native';

import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

import Feather from '@expo/vector-icons/Feather';

interface ColorProps{
  color?: string
  active?: boolean
}

export const Title = styled.Text`
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(10)}px;
`;
export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.shapes};
  border-radius: 5px;
  width: 100%;
  
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.line};
`;
export const Input = styled(TextInput)`
  color: ${({ theme }) => theme.colors.title};
  font-family: 'Rubik_400Regular';
  font-size: ${(RFValue(15))}px;
  flex: 1;
  padding: ${RFValue(23)}px ${RFValue(16)}px;
`;
export const ToggleShowPassButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(18)}px;
`;
export const Row = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: ${RFValue(10)}px 0 ;
`
export const TextLine = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: ${RFValue(10)}px 0 0;
  flex-wrap: wrap;
`
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: 'Rubik_400Regular';
  font-size: ${(RFValue(15))}px;
`
export const BoldText = styled.Text<ColorProps>`
 color: ${({ theme, active, color }) => color? color: theme.colors.line};
  font-family: 'Rubik_500Medium';
  font-size: ${(RFValue(15))}px;
`
export const Icon = styled(Feather).attrs({
  size: 24,
})`
  opacity: 0.6;
`;
export const ProgressBar = styled.View<ColorProps>`
  width: 24%;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme, active, color }) => active? color: theme.colors.line};
`
export const GenerateContainer = styled.View``
export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: 'Rubik_500Medium';
  font-size: ${(RFValue(15))}px;

  width: ${(RFValue(40))}px;
  height: ${(RFValue(40))}px;
  background: ${({ theme }) => theme.colors.line};

  text-align: center;
  line-height: ${(RFValue(40))}px;
  border-radius: 7px;

  margin-right: 15px;
`
export const Option = styled.Text<ColorProps>`
  color: ${({ theme }) => theme.colors.title};
  font-family: 'Rubik_500Medium';
  font-size: ${(RFValue(32))}px;

  width: ${(RFValue(70))}px;
  height: ${(RFValue(70))}px;
  background: ${({ theme }) => theme.colors.line};

  text-align: center;
  line-height: ${(RFValue(70))}px;
  border-radius: 7px;

  border-width: 4px;
  border-color: ${({ theme, active, color }) => active? color: theme.colors.line};
`




