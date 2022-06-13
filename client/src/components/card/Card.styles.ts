import styled from "styled-components";

import { COLORS } from "../../vars/colors";

export const Card = styled.div.attrs({
  className: "Card",
})`
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    background-color: ${COLORS.DARK_GRAY};
    box-shadow: unset;
    border: 1px solid ${COLORS.WHITE_30};

    &:hover {
      background-color: ${COLORS.DARK_GRAY} !important;
      border: 1px solid ${COLORS.WHITE_30} !important;
    }

    .header {
      color: ${COLORS.WHITE_70} !important;
    }

    .meta {
      color: ${COLORS.WHITE_70};
    }

    .description {
      color: ${COLORS.WHITE_70} !important;
    }
  }
`;
