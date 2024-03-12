import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import SButton from "../../components/Button";
import { refreshAccessToken } from "../../redux/authSlice";
import { setProducts, removeProduct } from "../../redux/productsSlice";
import { setImages } from "../../redux/imagesSlice";
import { getData, deleteData } from "../../utils/fetch";
import { config } from "../../config";

export default function Products() {
  const products = useSelector((state) => state.products.products);
  const images = useSelector((state) => state.images.images);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
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

  useEffect(() => {
    const fetchDataImages = async () => {
      try {
        const res = await getData(`/cms/images`);
        dispatch(setImages(res.data.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(refreshAccessToken());
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchDataImages();
  }, [dispatch]);

  if (!token) return <Navigate to="/signin" replace={true} />;

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
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">Nama Produk</th>
            <th className="py-2">Kategori</th>
            <th className="py-2">Deskripsi</th>
            <th className="py-2">Harga</th>
            <th className="py-2">Stok</th>
            <th className="py-2">Gambar</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="py-2">{product.productName}</td>
              <td className="py-2">{product.category.name}</td>
              <td className="py-2">{product.description}</td>
              <td className="py-2">{product.price}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2">
                {images.map(
                  (image) =>
                    image._id === product.image && (
                      <img
                        key={image._id}
                        src={`${config.api_url}/cms/images/${image.name}`}
                        alt={product.productName}
                        className="h-16 w-auto"
                      />
                    )
                )}
              </td>
              <td className="py-2 flex gap-5">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
