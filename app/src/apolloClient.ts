import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: API_URL ? `${API_URL}/graphql` : 'http://localhost:5000/graphql',
  credentials: "include",
});

let accessToken: string | null = null;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export default client;