import { FC, memo } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { PATHS } from "./constants";
import { NotFound } from "../../pages/not-found";
import { Home, Login, Register } from "../../pages";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutesComp: FC<AppRoutesProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path={PATHS.INDEX} element={<Home />} />;
        <Route path={PATHS.NOT_FOUND} element={<NotFound />} />;
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={PATHS.INDEX} element={<Navigate to={PATHS.LOGIN} />} />;
      <Route path={PATHS.LOGIN} element={<Login />} />;
      <Route path={PATHS.REGISTER} element={<Register />} />;
      <Route path={PATHS.NOT_FOUND} element={<NotFound />} />;
    </Routes>
  );
};

export const AppRoutes = memo(AppRoutesComp);
