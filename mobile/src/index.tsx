import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const Index: React.FC = () => {
  return (
    <NavigationContainer>
      <Routes />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </NavigationContainer>
  );
};

export default Index;
