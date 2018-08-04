import gql from 'graphql-tag';

export const LOGS_QUERY = gql`
  query($skip: Int, $first: Int, $orderBy: LogOrderByInput) {
    logs(skip: $skip, first: $first, orderBy: $orderBy) {
      action
      createdAt
      book {
        title
        author
        url
      }
    }
  }
`;
