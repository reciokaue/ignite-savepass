import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled(LinearGradient).attrs({
  end: { x: 1, y: 0 }
})`
  min-height: ${RFValue(85)}px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: ${RFValue(21)}px;
`;
export const Container = styled(RectButton)`
  flex: 1%;
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-radius: 5px;

  align-items: center;
  justify-content: space-between;
`;
export const ShowPasswordButton = styled(BorderlessButton)`
  padding: ${RFValue(16)}px;
`;
export const Icon = styled(Feather).attrs({
  size: 24,
})`
  opacity: 0.6;
`;
export const Info = styled.View`
  max-width: 243px;
`;
export const Title = styled.Text`
  margin-bottom: ${RFValue(4)}px;
  font-family: 'Rubik_400Regular';
  font-size: ${RFValue(13)}px;
  color:  ${({ theme }) => theme.colors.title};
`;
export const Password = styled.Text`
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(15)}px;
  color: #1967FB;
`;
export const LoginData = styled.View`
  max-width: 243px;
`;
export const BoldTitle = styled.Text`
  margin-bottom: ${RFValue(4)}px;
  font-family: 'Rubik_500Medium';
  font-size: ${RFValue(15)}px;
  color:  ${({ theme }) => theme.colors.title};
`;
export const Email = styled.Text`
  font-family: 'Rubik_400Regular';
  font-size: ${RFValue(13)}px;
  color:  ${({ theme }) => theme.colors.text};
`;