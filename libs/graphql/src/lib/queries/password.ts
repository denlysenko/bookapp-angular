import gql from 'graphql-tag';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;
