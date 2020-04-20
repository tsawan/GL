import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"
import "../node_modules/ag-grid-community/dist/styles/ag-theme-blue.css"
import 'antd/dist/antd.css'
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withApollo from '../lib/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withApollo(MyApp);