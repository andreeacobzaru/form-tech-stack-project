import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // Replace with the URL of your GraphQL API
  cache: new InMemoryCache()
});

export default client;