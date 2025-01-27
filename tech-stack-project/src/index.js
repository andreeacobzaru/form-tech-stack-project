import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import client from './client'

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App/>
        </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
