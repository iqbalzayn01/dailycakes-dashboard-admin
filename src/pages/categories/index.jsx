import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";

import SButton from "../../components/Button";
import { refreshAccessToken } from "../../redux/authSlice";
import { setCategories, removeCategory } from "../../redux/categoriesSlice";
import { getData, deleteData } from "../../utils/fetch";

export default function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/signin" replace={true} />;
    const fetchData = async () => {
      try {
        const res = await getData(`/cms/categories/`);
        dispatch(setCategories(res.data.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(refreshAccessToken());
        } else {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (categoryId) => {
    try {
      await deleteData(`/cms/categories/${categoryId}`);
      dispatch(removeCategory(categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (!Array.isArray(categories)) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full mx-auto p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-2xl">Kategori</h1>
        <SButton
          action={() => navigate("/categories/create")}
          className="bg-blue-500 hover:bg-blue-600 font-medium text-white text-lg px-4 py-2 rounded-xl"
        >
          + Kategori
        </SButton>
      </div>
      <ul className="flex flex-col gap-5">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center justify-between">
            <span>{category.name}</span>
            <div className="flex gap-5">
              <SButton
                type="button"
                className="bg-green-500 hover:bg-green-600 px-5 py-2 text-center text-white rounded-lg"
                action={() => navigate("/categories/edit")}
              >
                Edit
              </SButton>
              <SButton
                type="button"
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-center text-white rounded-lg"
                action={() => handleDelete(category._id)}
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
