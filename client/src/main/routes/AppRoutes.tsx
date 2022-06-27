import { FC } from "react";

import { Routes, Route } from "react-router-dom";

import { NotFound } from "../../pages/not-found";
import { Home, Login, Register } from "../../pages";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes: FC<AppRoutesProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="*" element={<NotFound />} />;
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />;
      <Route path="/login" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
};
