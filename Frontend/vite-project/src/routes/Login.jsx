import React, { useState } from "react";
import "../Styles/Form.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, loginUser } from "../slice/userSlice";
import { Input, Typography, Button } from "@material-tailwind/react";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goSignUp = () => {
    navigate(`/Form`);
  };
  const [loginError, setLoginError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = response.data;

      // Store the token in localStorage or a state management solution
      localStorage.setItem("token", token);
      console.log("Login successful");
      dispatch(getUser());
      navigate("/");
    } catch (error) {
      setLoginError(error.response.data.message);
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="form--div App flex justify-center items-center flex-col h-screen w-[100%]">
      <div className="form--header flex flex-col justify-center card w-[25rem] flex flex-col items-center justify-center gap-4 bg-orange-200 rounded p-4">
        <h2 className="form--title text-2xl font-bold text-center">Log in</h2>
        <p className="form--text text-sm text-center text-gray-600 dark:text-gray">
          Dont have an acount ?{" "}
          <a
            className="form--link text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-700 dark:hover:text-blue-400 hover:cursor-pointer"
            onClick={() => {
              goSignUp();
            }}
          >
            Join us
          </a>
        </p>

        <h4 className="form--text text-sm text-center dark:text-gray">
          Please Enter your details to Login
        </h4>
      </div>
      <form className="flex flex-col items-center justify-center gap-8 w-[25rem]">
        {/* <label htmlFor="name"  >Name</label> */}
        <span className="form--error" style={{ color: "red" }}>
          {loginError}
        </span>
        <Input
          type="text"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" className="form--submit !bg-orange-400  !text-white !hover:bg-orange-600" onClick={handleLogin}>
          LogIn
        </Button>
      </form>
    </div>
  );
}
