import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Sform from "./form";
import SAlert from "../../components/Alert";
// import SForm from "./form";
// import { postData } from "../../utils/fetch";
// import { useDispatch } from "react-redux";
// import { userLogin } from "../../redux/auth/actions";
import axios from "axios";

export default function PageSignIn() {
  // const dispatch = useDispatch();

  // const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });

  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/cms/auth/signin",
        {
          email: form.email,
          password: form.password,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err.response.data.msg);
      setAlert({
        status: true,
        message: err.response.data.msg,
      });
    }
  };

  return (
    <section className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
      <h1 className="font-bold text-2xl text-center uppercase tracking-wider">
        DailyCakes <i className="text-blue-500">Admin</i>
      </h1>
      <h3 className="text-center">Sign In</h3>
      {alert.status && (
        <SAlert
          className="bg-red-100 text-red-600 px-5 py-2 rounded-lg"
          message={alert.message}
        />
      )}
      <Sform
        valueEmail={form.email}
        valuePassword={form.password}
        handleSubmit={handleSubmit}
        onChange={handleChange}
      />
    </section>
  );
}
