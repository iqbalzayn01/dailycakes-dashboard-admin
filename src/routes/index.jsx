import { Route, Routes } from "react-router-dom";

import PageSignIn from "../pages/signin";
import { HomeRoute } from "./HomeRoute";
// import GuardRoute from "../components/GuradRoute";
// import GuestOnlyRoute from "../components/GuestOnlyRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageSignIn />
          // <GuestOnlyRoute>
          //   <PageSignIn />
          // </GuestOnlyRoute>
        }
      />
      <Route path="dashboard/*" element={<HomeRoute />} />
      {/* <Route
        path="/"
        element={
          <>
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
      </Route> */}
    </Routes>
  );
};
