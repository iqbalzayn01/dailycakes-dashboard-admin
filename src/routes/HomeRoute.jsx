import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/dashboard";

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
