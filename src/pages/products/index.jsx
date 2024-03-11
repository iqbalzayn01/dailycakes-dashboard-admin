import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import SButton from "../../components/Button";
import { refreshAccessToken } from "../../redux/authSlice";
import { setProducts, removeProduct } from "../../redux/productsSlice";
import { getData, deleteData } from "../../utils/fetch";

export default function Products() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/signin" replace={true} />;
    const fetchData = async () => {
      try {
        const res = await getData(`/cms/products`);
        dispatch(setProducts(res.data.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(refreshAccessToken());
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (productId) => {
    try {
      await deleteData(`/cms/products/${productId}`);
      dispatch(removeProduct(productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full mx-auto p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-2xl">Daftar Produk</h1>
        <SButton
          action={() => navigate("/products/create")}
          className="bg-blue-500 hover:bg-blue-600 font-medium text-white text-lg px-4 py-2 rounded-xl"
        >
          + Daftar Produk
        </SButton>
      </div>
      <ul className="flex flex-col gap-5">
        {products.map((product) => (
          <li key={product._id} className="flex items-center justify-between">
            <span>{product.productName}</span>
            <div className="flex gap-5">
              <SButton
                type="button"
                className="bg-green-500 hover:bg-green-600 px-5 py-2 text-center text-white rounded-lg"
                action={() => navigate(`/products/edit/${product._id}`)}
              >
                Edit
              </SButton>
              <SButton
                type="button"
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-center text-white rounded-lg"
                action={() => handleDelete(product._id)}
              >
                Hapus
              </SButton>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
