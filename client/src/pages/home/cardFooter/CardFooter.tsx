import { FC } from "react";

import { Button, Icon, Label } from "semantic-ui-react";

interface CardFooterProps {
  likesCount: number;
  commentsCount: number;
  onLikePost: () => void;
}

export const CardFooter: FC<CardFooterProps> = ({
  onLikePost,
  likesCount,
  commentsCount,
}) => {
  return (
    <Button as="div" labelPosition="right" onClick={(e) => e.stopPropagation()}>
      <Button color="teal" onClick={onLikePost} className="Home-card-btn">
        <Icon name="heart" />
      </Button>
      <Label basic color="teal" pointing="left" className="Home-card-label">
        {likesCount}
      </Label>

      <Button color="teal" onClick={onLikePost} className="Home-card-btn">
        <Icon name="comments" />
      </Button>
      <Label basic color="teal" pointing="left" className="Home-card-label">
        {commentsCount}
      </Label>
    </Button>
  );
};
