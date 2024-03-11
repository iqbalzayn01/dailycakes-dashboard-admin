import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import PageSignIn from "../pages/signin";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { HomeRoute } from "./HomeRoute";
import { CategoriesRoute } from "./CategoriesRoute";
import { ProductsRoute } from "./ProductsRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<PageSignIn />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col flex-grow">
                <Topbar />
                <Routes>
                  <Route path="/*" element={<HomeRoute />} />
                  <Route path="/categories/*" element={<CategoriesRoute />} />
                  <Route path="/products/*" element={<ProductsRoute />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" replace={true} />;

  return <>{children}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
