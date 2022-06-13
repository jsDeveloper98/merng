import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        body
        createdAt
        id
        username
      }
      commentsCount
      likes {
        username
        id
        createdAt
      }
      likesCount
    }
  }
`;
