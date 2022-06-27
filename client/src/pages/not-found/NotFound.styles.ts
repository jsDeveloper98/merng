import styled from "styled-components";
import { COLORS } from "../../vars/colors";

export const NotFound = styled.section.attrs({
  className: "NotFound",
})`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${COLORS.WHITE_70};
`;
