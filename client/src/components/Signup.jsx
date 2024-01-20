import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
      position: "bottom-right",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:4000/profile/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...inputValue }),
        });
    
        const data = await response.json();
        const { success, message } = data;
    
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/userDetails");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.error(error);
      }
    
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
      });
    };
    

  return (
    <div className="flex login flex-col border justify-center items-end pr-80 h-screen w-screen">
    <div className="border-4 bg-white bg-opacity-10 text-white border-white rounded-lg p-20"> <h2 className="text-5xl text-center font-semibold">Signup</h2>
      <form onSubmit={handleSubmit}>
      <div className="mt-10">
          <label htmlFor="email"  className="p-4 m-[20px] text-xl">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className=" bg-transparent border-2 h-10 rounded-xl"
            placeholder="   Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email"  className="p-4 text-xl ">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            className=" bg-transparent border-2 h-10 rounded-xl"
            placeholder="   Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="mt-4 ">
          <label htmlFor="password"  className="p-4 m-1 text-xl">Password</label>
          <input
            type="password"
            name="password"
            className=" bg-transparent border-2 h-10 rounded-xl"
            value={password}
            placeholder="   Enter your password"
            onChange={handleOnChange}
          />
        </div>
<div className="flex mt-6 mb-6 border h-10 hover:bg-blue-500 justify-center" onClick={handleSubmit}>
        <button type="submit">Submit</button>
        </div>
          <div>
          Already have an account? <Link to={"/login"}>Login</Link>
          </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Signup;