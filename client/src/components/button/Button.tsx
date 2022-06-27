import { FC, ReactNode } from "react";

import { Button as SUIButton } from "semantic-ui-react";

import * as styles from "./Button.styles";

interface ButtonProps {
  type?: "primary";
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, type = "primary" }) => {
  return (
    <styles.Button type={type}>
      <SUIButton>{children}</SUIButton>
    </styles.Button>
  );
};
