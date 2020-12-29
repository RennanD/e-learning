import React from 'react';
import { heroImage } from '../../assets/images';

import {
  Container,
  HeroImage,
  Title,
  Subtitle,
  LoginButton,
  LoginButtonText,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <HeroImage source={heroImage} resizeMode="contain" />
      <Title>Aprenda da melhor forma</Title>
      <Subtitle>
        Entre na plataforma e acesse cursos de diversas áreas de conhecimento.
      </Subtitle>

      <LoginButton>
        <LoginButtonText>Começar os estudos</LoginButtonText>
      </LoginButton>
    </Container>
  );
};

export default Login;
