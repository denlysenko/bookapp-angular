import gql from 'graphql-tag';

export const BOOKMARKS_BY_USER_AND_BOOK_QUERY = gql`
  query($bookId: ID!) {
    userBookmarksByBook(bookId: $bookId) {
      type
    }
  }
`;
