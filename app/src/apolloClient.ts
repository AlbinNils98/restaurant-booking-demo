import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('jwtToken');
      return { headers };
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;