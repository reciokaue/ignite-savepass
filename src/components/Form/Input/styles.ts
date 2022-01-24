import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from '@expo/vector-icons/Feather';

// import { useTheme } from 'styled-components';
// const { colors } = useTheme() 

export const Container = styled.View`
  margin-bottom: ${RFValue(17)}px;
`;

export const Label = styled.Text`
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(9)}px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.exclude};
  margin-bottom: 4px;
  font-family: 'Rubik_300Light';
  font-size: ${RFValue(13)}px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.shapes};
  padding: ${RFValue(23)}px ${RFValue(16)}px;
  border-radius: 5px;
  width: 100%;

  border-left-width: 3px;
  border-left-color: ${({ theme }) => theme.colors.line};
`;

export const FormInput = styled(TextInput)`
  color: ${({ theme }) => theme.colors.input};
  font-size: ${(RFValue(15))}px;
  flex: 1;
  height: 100%;
`;

export const ToggleShowPassButton = styled.Pressable`
  margin-left: 20px;
`;

export const Icon = styled(Feather).attrs({
  size: 24,
})`
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.input};
`;