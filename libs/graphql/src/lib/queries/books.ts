import gql from 'graphql-tag';

import { CreatedBookFragment } from './fragments';

export const CREATE_BOOK_MUTATION = gql`
  mutation($book: BookInput!) {
    createBook(book: $book) {
      ...CreatedBook
    }
  }
  ${CreatedBookFragment}
`;
