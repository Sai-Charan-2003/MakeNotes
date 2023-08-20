import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../serverUrl";
import { useForm } from "react-hook-form";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const formSubmit = (data, event) => {
    event.preventDefault();
    fetch(`${serverUrl}login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(login),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("status:404");
          }
          throw new Error("Invalid username or password. Please try again.");
        }
        return res.json();
      })
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setError("username", {
          type: "manual",
          message: "Check your username",
        });
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form method="POST" onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: "Username is required." })}
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: "Password is required." })}
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
