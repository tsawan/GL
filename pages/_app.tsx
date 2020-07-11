import "../main.css"
import 'antd/dist/antd.css'
import '../assets/styles/style.css';
import { AppProps } from 'next/app'
import React from 'react';
//import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withApollo from '../lib/apollo-client';

const App = ({ Component, pageProps, apollo }) => (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );

// Wraps all components in the tree with the data provider
export default withApollo(App);