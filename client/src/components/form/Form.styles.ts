import styled from "styled-components";

import { COLORS } from "../../vars/colors";

export const Form = styled.div.attrs({
  className: "Form",
})`
  width: 450px;
  background-color: ${COLORS.DARK_GRAY};
  padding: 30px 40px;
  border-radius: 15px;
  border: 1px solid ${COLORS.WHITE_30};

  .row {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }

  input {
    padding: 8px 10px;
    border-radius: 5px;
  }

  label {
    margin-bottom: 3px;
    margin-left: 3px;
    color: ${COLORS.WHITE_70};
  }

  h1 {
    display: flex;
    align-items: center;
    color: ${COLORS.WHITE_70};
  }

  .btn-row {
    margin: 20px 0 10px 0;
  }
`;
