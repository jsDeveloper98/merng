import { FC } from "react";
// import { Navbar } from "hovo-components";
import { Container } from "semantic-ui-react";

import { PAGES } from "./constants";
import * as styles from "./App.styles";
import { Navbar } from "../../components";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

export const App: FC = () => {
  let { pathname } = useLocation();

  return (
    <styles.App>
      <Container>
        <Navbar items={PAGES} pathname={pathname} />
        <AppRoutes />
      </Container>
    </styles.App>
  );
};
