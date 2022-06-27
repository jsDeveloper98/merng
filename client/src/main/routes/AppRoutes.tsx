import { FC } from "react";

import { Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "../../pages";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes: FC<AppRoutesProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />;
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
