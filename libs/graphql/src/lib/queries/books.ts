import gql from 'graphql-tag';

export const CREATE_BOOK_MUTATION = gql`
  mutation($book: BookInput!) {
    createBook(book: $book) {
      id
    }
  }
`;
