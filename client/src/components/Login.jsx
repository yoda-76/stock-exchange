import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../App.css"
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/profile/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        console.log(inputValue.email);
        window.localStorage.setItem("email",inputValue.email)
        handleSuccess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex login flex-col border justify-center items-center lg:items-end lg:pr-80 h-screen w-screen">
     <div className="border-4 bg-white bg-opacity-10 text-white border-white rounded-lg p-20"> <h2 className="text-5xl font-semibold">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <label className="p-4 m-[18px] text-xl" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="bg-transparent h-10 border-2 rounded-xl"
            placeholder="    Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="mt-4">
          <label className="p-4 text-xl" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="bg-transparent h-10 border-2 rounded-xl"
            placeholder="    Enter your password"
            onChange={handleOnChange}
          />
        </div>
<div className="flex mt-6 mb-6 border h-10 hover:bg-blue-500 justify-center" onClick={handleSubmit}>
<button type="submit" className="">Submit</button>

</div>
        <div>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </div>
      </form>
      <ToastContainer />
      </div>
    </div>
  );
};

export default Login;