import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background: #6548a3;
`;

export const HeroImage = styled.Image`
  height: 304px;
`;

export const Title = styled.Text`
  color: #ff6680;
  font-size: 36px;
  line-height: 42px;
  margin-top: 20px;
  font-weight: 400;
  width: 225px;
`;

export const Subtitle = styled.Text`
  color: #edebf5;
  font-size: 15px;
  line-height: 25px;
  margin-top: 20px;
  font-weight: 400;
  width: 217px;
`;

export const LoginButton = styled(RectButton)`
  position: absolute;
  align-items: center;
  justify-content: center;

  height: 56px;

  bottom: 20px;
  left: 20px;
  right: 20px;

  /* Pink */

  background: #ff6680;
  border-radius: 100px;
`;

export const LoginButtonText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #ffffff;
`;
