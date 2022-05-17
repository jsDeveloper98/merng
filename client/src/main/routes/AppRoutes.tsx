import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "../../pages";

interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
