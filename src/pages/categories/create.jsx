import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";
import { config } from "../../config";
import SAlert from "../../components/Alert";
import { addCategories } from "../../redux/categoriesSlice";

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    setIsLoading(true);
    const res = await axios.post(
      `${config.api_url}/cms/categories`,
      {
        name: form.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res?.data?.data) {
      dispatch(addCategories(res.data.data.name));
      console.log(res.data);
      navigate("/categories");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.data?.msg ?? "Internal Server Error",
      });
    }
  };

  return (
    <>
      {alert.status && (
        <SAlert
          className="bg-red-100 text-red-600 px-5 py-2 rounded-lg"
          message={alert.message}
        />
      )}
      <form onSubmit={handleSubmit} className="text-center">
        <TextInputWithLabel
          htmlFor="name"
          label="Nama Kategori"
          name="name"
          type="text"
          value={form.name}
          className="text-input mb-6"
          placeholder="Nama Kategori"
          onChange={handleChange}
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
    </>
  );
}
