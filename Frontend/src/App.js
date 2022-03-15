import React from 'react'
import AppRouter from './routers/AppRouter';
import {BrowserRouter as Router} from 'react-router-dom'
import Layout from './components/layouts/Layout'
import { ApolloProvider } from '@apollo/client';
import history from './history'

function App() {

  return (
    <div>
      <ApolloProvider>
      <Router history = {history}>
        <Layout>
            <AppRouter/>
        </Layout>
      </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;

