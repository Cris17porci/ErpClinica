// App.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './componentes/Header/Header';
import Body from './componentes/Body';
import Footer from './componentes/Footer/Footer';
import Menu from './componentes/Menu/Menu';
import FormularioCitas from './componentes/FormularioCitas/FormularioCitas';
import { Route, Router, Switch } from 'wouter';
import './App.css';

// Configurar Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Cambia la URL a la ruta de tu servidor GraphQL
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="app-container">
      <Header />
      <Menu />
      <div className="content">
        <Router>
          <Switch>
            <Route path="/formulario-citas" component={FormularioCitas} />
            <Route path="/">
              <Body />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  </ApolloProvider>
);
}

export default App;