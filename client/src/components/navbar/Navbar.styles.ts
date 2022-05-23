import styled from "styled-components";

import { DARK_GRAY, WHITE, WHITE_70 } from "../../vars/colors";

export const Navbar = styled.nav.attrs({
  className: "Navbar",
})`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: ${DARK_GRAY};
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
      color: ${WHITE_70};

      &-active {
        color: ${WHITE};
      }
    }
  }
`;
