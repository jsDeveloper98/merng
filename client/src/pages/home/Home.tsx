import { FC } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";

import * as styles from "./Home.styles";
import { Card, Spinner } from "../../components";
import { Post } from "../../graphql/generated/graphql";
import { Button, Icon, Label } from "semantic-ui-react";
import { FETCH_POSTS } from "../../graphql/queries/postQueries";

export const Home: FC = () => {
  const { loading, data } = useQuery<{ getPosts: Post[] }>(FETCH_POSTS);

  const posts = data?.getPosts;

  if (loading) {
    return <Spinner />;
  }

  const likePost = () => {
    console.log({ likePost });
  };

  return (
    <styles.Home>
      <header>
        <h1>Recent Posts</h1>
      </header>

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
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    color="teal"
                    onClick={likePost}
                    className="Home-card-btn"
                  >
                    <Icon name="heart" />
                  </Button>
                  <Label
                    basic
                    color="teal"
                    pointing="left"
                    className="Home-card-label"
                  >
                    {likesCount}
                  </Label>

                  <Button
                    color="teal"
                    onClick={likePost}
                    className="Home-card-btn"
                  >
                    <Icon name="comments" />
                  </Button>
                  <Label
                    basic
                    color="teal"
                    pointing="left"
                    className="Home-card-label"
                  >
                    {commentsCount}
                  </Label>
                </Button>
              }
            />
          )
        )}
      </div>
    </styles.Home>
  );
};
