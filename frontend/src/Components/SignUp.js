import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../serverUrl";
import { useForm } from "react-hook-form";

function SignUp() {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const formSubmit = (data, event) => {
    event.preventDefault();
    fetch(`${serverUrl}signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signup),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 409) {
            throw new Error("status:409");
          }
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => {
        console.log("Error:", error.message);
        if (error.message === "status:409") {
          setError("username", {
            type: "manual",
            message: "username already exists",
          });
        }
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Check the length (<5)",
              },
            })}
            value={signup.username}
            onChange={(e) => setSignup({ ...signup, username: e.target.value })}
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
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 5,
                message: "Check the length (<5)",
              },
            })}
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
