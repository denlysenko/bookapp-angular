import gql from 'graphql-tag';

export const ProfileFragment = gql`
  fragment Profile on User {
    id
    email
    firstName
    lastName
    displayName
    avatar
    roles
    reading {
      epubUrl
      bookmark
    }
  }
`;

export const CreatedBookFragment = gql`
  fragment CreatedBook on Book {
    id
    title
    author
    description
    coverUrl
    epubUrl
    paid
    price
  }
`;
