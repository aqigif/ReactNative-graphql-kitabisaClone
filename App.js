import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/utils/client';
import MainApp from './src/navigations/navigations';
import { Root } from 'popup-ui';

const App = () => (
  <ApolloProvider client={client}>
    <Root>
      <MainApp />
    </Root>
  </ApolloProvider>
);

export default App;