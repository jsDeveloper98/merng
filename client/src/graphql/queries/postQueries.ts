import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likes {
        username
        id
        createdAt
      }
      likesCount
      comments {
        body
        createdAt
        id
        username
      }
      commentsCount
    }
  }
`;
