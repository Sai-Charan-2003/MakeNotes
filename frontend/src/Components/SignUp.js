import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const formSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signup),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/notes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={signup.username}
            onChange={(e) => setSignup({ ...signup, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
