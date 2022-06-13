import styled from "styled-components";

export const Spinner = styled.div.attrs({
  className: "Spinner",
})`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .segment {
    border: none;
    border-radius: unset;
    background-color: transparent;

    .dimmer {
      background-color: transparent;
    }
  }
`;
