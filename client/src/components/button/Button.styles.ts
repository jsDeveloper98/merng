import styled from "styled-components";

import { COLORS } from "../../vars/colors";

const COLORS_MAP = {
  primary: {
    color: COLORS.WHITE,
    bgColor: COLORS.DARK_PINK,
    hover: COLORS.DARK_PINK_70,
  },
};

interface ButtonProps {
  type: "primary";
}

export const Button = styled.div.attrs<ButtonProps>({
  className: "Button",
})<ButtonProps>`
  button {
    color: ${(p) => COLORS_MAP[p.type].color} !important;
    background-color: ${(p) => COLORS_MAP[p.type].bgColor} !important;

    &:hover {
      background-color: ${(p) => COLORS_MAP[p.type].hover} !important;
    }
  }
`;
