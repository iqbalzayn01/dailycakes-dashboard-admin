// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Sform from "./form";
// import SAlert from "../../components/Alert";
// import SForm from "./form";
// import { postData } from "../../utils/fetch";
// import { useDispatch } from "react-redux";
// import { userLogin } from "../../redux/auth/actions";

export default function PageSignIn() {
  // const dispatch = useDispatch();

  // const navigate = useNavigate();
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [alert, setAlert] = useState({
  //   status: false,
  //   message: "",
  //   type: "",
  // });

  // const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async () => {
  //   setIsLoading(true);

  //   const res = await postData(`/cms/auth/signin`, form);

  //   if (res?.data?.data) {
  //     dispatch(
  //       userLogin(
  //         res.data.data.token,
  //         res.data.data.role,
  //         res.data.data.refreshToken
  //       )
  //     );
  //     setIsLoading(false);
  //     navigate("/");
  //   } else {
  //     setIsLoading(false);
  //     setAlert({
  //       status: true,
  //       message: res?.response?.data?.msg ?? "Internal server error",
  //       type: "danger",
  //     });
  //   }
  // };

  return (
    <section className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
      <h1 className="font-bold text-2xl text-center uppercase tracking-wider">
        DailyCakes <i className="text-blue-500">Admin</i>
      </h1>
      <h3 className="text-center">Sign In</h3>
      <Sform />
    </section>
  );
}
