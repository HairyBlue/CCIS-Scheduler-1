import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Forms.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const user = JSON.stringify({
      username,
      password
    });

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: user
      }
    );
    const data = await response.json();

    const { success_message, student } = data;

    console.log(success_message, student);
  };

  const validateForm = (e) => {
    e.preventDefault();

    login();
  };

  return (
    <div className="login-form-container container column">
      <form
        className="container column border-style"
        action=""
        method="POST"
        onSubmit={validateForm}
      >
        <div className="login-input-container container column">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username or email"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-input-container container column">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>

        <div className="redirect-signup-container container">
          <p>Don't have an account?</p>
          <Link to="/signup">Register here</Link>
        </div>
      </form>
    </div>
  );
}
