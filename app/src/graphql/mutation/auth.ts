import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password)
}
`;

export const SIGN_OUT_MUTATION = gql`
mutation SignOut {
  signOut {
    success
  }
}
`;

export const REFRESH_MUTATION = gql`
mutation Refresh {
  refresh
}
`;