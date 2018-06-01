import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: UserInput!) {
    signup(user: $user) {
      token
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    id
    email
    firstName
    lastName
    displayName
    avatar
    roles
    reading
  }
`;
