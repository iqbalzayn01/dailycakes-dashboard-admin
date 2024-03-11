import { Route, Routes } from "react-router-dom";

import Products from "../pages/products";
import Create from "../pages/products/create";
import Edit from "../pages/products/edit";

export const ProductsRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:productId" element={<Edit />} />
    </Routes>
  );
};
