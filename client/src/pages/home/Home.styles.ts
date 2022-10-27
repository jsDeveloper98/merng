import styled from "styled-components";

import { COLORS } from "./../../vars/colors";

export const Home = styled.section.attrs({
  className: "Home",
})`
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    color: ${COLORS.WHITE_70};
  }

  display: flex;
  flex: 1;
  flex-direction: column;

  .Home {
    &-card-list {
      width: 100%;
      display: grid;
      row-gap: 20px;
      padding: 20px 0;
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    &-post-form-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;
    }

    &-card-btn {
      background-color: ${COLORS.DARK_PINK} !important;

      &:hover {
        background-color: ${COLORS.DARK_PINK_70} !important;
      }
    }

    &-card-label:not(:first-child) {
      margin-left: 5px !important;
    }

    &-card-label {
      &::before {
        border-color: ${COLORS.DARK_PINK} !important;
      }
    }
  }

  .ui.labeled.button > .button:not(:first-child) {
    margin-left: 5px !important;
  }

  .ui.basic.teal.label {
    border-color: ${COLORS.DARK_PINK} !important;
    color: ${COLORS.DARK_PINK} !important;
  }

  @media only screen and (max-width: 680px) {
    body {
      background-color: lightblue;
    }
  }
`;
