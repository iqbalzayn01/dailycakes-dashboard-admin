import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../../config";

import TextInputWithLabel from "../../components/TextInputWithLabel";
import TextAreaWithLabel from "../../components/TextAreaWithLabel";
import SButton from "../../components/Button";
import SAlert from "../../components/Alert";
import { getData, postData } from "../../utils/fetch";
import { setCategories } from "../../redux/categoriesSlice";
import { addProduct } from "../../redux/productsSlice";
import { addImage } from "../../redux/imagesSlice";

export default function Create() {
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData("/cms/categories");
        dispatch(setCategories(res.data.data));
      } catch (err) {
        setAlert({
          status: true,
          message: err.res?.data?.msg ?? "Internal Server Error",
        });
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("product_image", image);

    let imageId = null;

    try {
      const token = localStorage.getItem("token");
      const resImg = await axios.post(
        `${config.api_url}/cms/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(addImage(resImg.data.data));
      imageId = resImg.data.data._id;
    } catch (err) {
      console.error("Error uploading image:", err);
    }

    try {
      const payload = {
        productName: form.productName,
        description: form.description,
        price: form.price,
        stock: form.stock,
        category: form.category,
        image: imageId,
      };

      const res = await postData(`/cms/products`, payload);
      dispatch(addProduct(res.data.data));
      setIsLoading(false);
      navigate("/products");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err.res?.data ?? "Internal Server Error",
      });
    }

    setIsLoading(false);
  };

  return (
    <main className="w-full m-auto p-5">
      {alert.status && (
        <SAlert
          className="bg-red-100 text-red-600 px-5 py-2 rounded-lg"
          message={alert.message}
        />
      )}
      <form onSubmit={handleSubmit} className="text-center">
        <TextInputWithLabel
          htmlFor="productName"
          label="Nama Produk"
          name="productName"
          type="text"
          value={form.name}
          className="text-input mb-6"
          placeholder="Nama Produk"
          onChange={handleChange}
        />
        <TextAreaWithLabel
          htmlFor="description"
          label="Deskripsi"
          name="description"
          type="text"
          value={form.description}
          className="text-input mb-6"
          placeholder="Deskripsi"
          onChange={handleChange}
        />
        <TextInputWithLabel
          htmlFor="price"
          label="Harga"
          name="price"
          type="number"
          value={form.price}
          className="text-input mb-6"
          placeholder="Harga"
          onChange={handleChange}
        />
        <TextInputWithLabel
          htmlFor="stock"
          label="Stok"
          name="stock"
          type="number"
          value={form.stock}
          className="text-input mb-6"
          placeholder="Stok"
          onChange={handleChange}
        />
        <select
          name="category"
          className="text-input mb-6"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <TextInputWithLabel
          htmlFor="image"
          label="Gambar"
          name="image"
          type="file"
          className="text-input mb-6"
          placeholder="Gambar"
          onChange={handleImageChange}
        />
        <SButton
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-center text-white rounded-lg"
          loading={isLoading}
          disabled={isLoading}
        >
          Tambah
        </SButton>
      </form>
    </main>
  );
}
