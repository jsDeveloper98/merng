import { FC, ReactElement } from "react";

import { Card as SUICard, Image } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";

import * as styles from "./Card.styles";

interface CardProps {
  id: string;
  text?: string;
  title: string;
  subtitle?: string;
  clickable?: boolean;
  footer?: ReactElement;
  additionalPathName?: string;
  onClick?: (id: string) => void;
}

export const Card: FC<CardProps> = ({
  id,
  text,
  title,
  footer,
  onClick,
  subtitle,
  clickable,
  additionalPathName = "",
}) => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const path = pathname !== "/" ? `/${pathname}` : `/${additionalPathName}`;

  return (
    <styles.Card>
      <SUICard
        onClick={() => {
          onClick?.(id);
          clickable && navigate(`${path}/${id}`);
        }}
      >
        <SUICard.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <SUICard.Header>{title}</SUICard.Header>
          {subtitle && <SUICard.Meta>{subtitle}</SUICard.Meta>}
          {text && <SUICard.Description>{text}</SUICard.Description>}
        </SUICard.Content>
        {footer && <SUICard.Content extra>{footer}</SUICard.Content>}
      </SUICard>
    </styles.Card>
  );
};
