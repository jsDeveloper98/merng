import { FC, useContext } from "react";

// import { Navbar } from "hovo-components";
import { Container } from "semantic-ui-react";

import { getNavItems } from "./helpers";
import { Navbar } from "../../components";
import { AuthContext } from "../../context";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

import * as styles from "./App.styles";

export const App: FC = () => {
  let { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <styles.App>
      <Container>
        <Navbar items={getNavItems(!!user, { logout })} pathname={pathname} />
        <AppRoutes isAuthenticated={!!user} />
      </Container>
    </styles.App>
  );
};
