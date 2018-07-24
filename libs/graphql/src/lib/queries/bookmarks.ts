import gql from 'graphql-tag';

export const BOOKMARKS_BY_USER_AND_BOOK_QUERY = gql`
  query($bookId: ID!) {
    userBookmarksByBook(bookId: $bookId) {
      type
    }
  }
`;

export const ADD_TO_BOOKMARKS_MUTATION = gql`
  mutation($type: BookmarkType!, $bookId: ID!) {
    addToBookmarks(type: $type, bookId: $bookId) {
      type
    }
  }
`;

export const REMOVE_FROM_BOOKMARKS_MUTATION = gql`
  mutation($type: BookmarkType!, $bookId: ID!) {
    removeFromBookmarks(type: $type, bookId: $bookId) {
      type
    }
  }
`;
