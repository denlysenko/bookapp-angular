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

export const BOOK_FOR_EDIT_QUERY = gql`
  query($slug: String!) {
    book(slug: $slug) {
      ...CreatedBook
    }
  }
  ${CreatedBookFragment}
`;
