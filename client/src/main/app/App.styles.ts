import styled from "styled-components";

export const App = styled.div.attrs({
  className: "App",
})`
  height: 100vh;

  > .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media ${`(max-width: 680px)`} {
    .Home-card-list {
      display: block !important;
    }
  }
`;
