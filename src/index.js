import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ApolloClient , ApolloProvider ,InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri:"https://shaban-hamdy-graph-ql-node.vercel.app/graphql",
  cache : new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
    <App />
    </ApolloProvider>
  </React.StrictMode>
);

