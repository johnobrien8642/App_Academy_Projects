import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-client';
import Nav from '../src/components/Nav'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HashRouter } from 'react-router-dom';
import Mutations from '../src/graphql/mutations'
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
})

persistCache({
  cache,
  storage: window.localStorage,
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
})

const token = localStorage.getItem('auth-token');

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    username: '',
    cart: []
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          username: data.verifyUser.name,
          cart: []
        }
      })
    })
} else {
  cache.writeData({
    data: {
      isLoggedIn: false,
      cart: []
    }
  })
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Nav />
        <App />
      </HashRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
