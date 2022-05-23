import { FC } from "react";
import { useQuery, gql } from "@apollo/client";

import * as styles from "./Home.styles";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const Home: FC = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log("%c data ===>", "color: #90ee90", data);

  return (
    <styles.Home>
      <h1>Home</h1>
    </styles.Home>
  );
};
