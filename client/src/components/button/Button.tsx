import { FC, memo, ReactNode } from "react";

import { Button as SUIButton } from "semantic-ui-react";

import * as styles from "./Button.styles";

interface ButtonProps {
  type?: "primary";
  children?: ReactNode;
}

const ButtonComp: FC<ButtonProps> = ({ children, type = "primary" }) => {
  return (
    <styles.Button type={type}>
      <SUIButton>{children}</SUIButton>
    </styles.Button>
  );
};

export const Button = memo(ButtonComp);
