import styled from "styled-components";

import { COLORS } from "../../vars/colors";

export const Navbar = styled.nav.attrs({
  className: "Navbar",
})`
  display: flex;
  width: 100%;
  min-height: 50px;
  background-color: ${COLORS.DARK_GRAY};
  padding: 0 25px;

  .Navbar {
    &-list {
      width: 50%;
      display: flex;
      align-items: center;
    }

    &-list-right {
      justify-content: flex-end;
    }

    &-list-item {
      margin: 0 5px;
      cursor: pointer;
      color: ${COLORS.WHITE_70};

      &-active {
        color: ${COLORS.WHITE};
      }
    }
  }
`;
