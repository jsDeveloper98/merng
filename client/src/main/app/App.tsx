import { FC } from "react";
import { Navbar } from "hovo-components";
import { BrowserRouter as Router } from "react-router-dom";

import { PAGES } from "./constants";
import * as styles from "./App.styles";
import { AppRoutes } from "../routes/AppRoutes";

export const App: FC = () => {
  return (
    <styles.App>
      <Router>
        <Navbar items={PAGES} defaultActiveKey="" />
        <AppRoutes />
      </Router>
    </styles.App>
  );
};