import { FC, memo } from "react";

import moment from "moment";

import { CardFooter } from "./card-footer";
import { Card, Spinner } from "../../../components";
import { Post } from "../../../graphql/generated/graphql";
import { FETCH_POSTS } from "../../../graphql/queries/postQueries";

import { useQuery } from "@apollo/client";

const PostListLocal: FC = memo(() => {
  const { loading, data } = useQuery<{ getPosts: Post[] }>(FETCH_POSTS);

  const posts = data?.getPosts;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="Home-card-list">
      {posts?.map(
        ({ username, createdAt, body, id, likesCount, commentsCount }) => (
          <Card
            id={id}
            key={id}
            clickable
            text={body}
            title={username}
            additionalPathName="posts"
            subtitle={moment(createdAt).fromNow()}
            footer={
              <CardFooter
                onLikePost={() => console.log("test")}
                likesCount={likesCount}
                commentsCount={commentsCount}
              />
            }
          />
        )
      )}
    </div>
  );
});

export const PostList = memo(PostListLocal);
