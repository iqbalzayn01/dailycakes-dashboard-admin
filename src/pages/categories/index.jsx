import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../../redux/authSlice";
import { setCategories } from "../../redux/categoriesSlice";
import axios from "axios";

import { config } from "../../config";

export default function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/signin" replace={true} />;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.api_url}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCategories(response.data.data));
        // console.log(typeof response.data.data);
      } catch (error) {
        if (error.response && error.response.statu === 401) {
          dispatch(refreshAccessToken());
        } else {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchCategories();
  }, [dispatch]);

  if (!Array.isArray(categories)) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full mx-auto p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-2xl">Kategori</h1>
        <button
          onClick={() => navigate("/categories/create")}
          className="bg-blue-500 hover:bg-blue-600 font-medium text-white text-lg px-4 py-2 rounded-xl"
        >
          + Kategori
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </main>
  );
}
