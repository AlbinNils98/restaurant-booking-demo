import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const API_URL = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: API_URL ? `${API_URL}/graphql` : 'http://localhost:5000/graphql',
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;