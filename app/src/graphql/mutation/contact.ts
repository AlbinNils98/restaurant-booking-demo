import gql from 'graphql-tag';

export const SEND_CONTACT_EMAIL_MUTATION = gql`
mutation sendContactEmail($name: String!, $email: String!, $message: String!){
  sendContactEmail(name: $name, email: $email, message: $message)
}
`;