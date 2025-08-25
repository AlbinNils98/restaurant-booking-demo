import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    success
  }
}
`;

export const SIGN_OUT_MUTATION = gql`
mutation SignOut {
  signOut {
    success
  }
}
`;