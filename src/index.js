import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from "@apollo/client";


// Creating the GraphQL / Apollo Client

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
