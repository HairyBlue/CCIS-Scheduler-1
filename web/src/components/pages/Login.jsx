import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../Loader";
import { setUser, setLogin } from "../features/Profile/userSlice";

import "./Forms.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);

    const url = isAdmin
      ? `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/admin/login`
      : `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/login`;

    const user = {
      username,
      password
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(user)
    });
    const data = await response.json();

    const { success_message, student, admin } = data;

    console.log(success_message);

    if (student !== undefined) {
      dispatch(setUser(student));
      dispatch(setLogin(true));

      const user = {
        ...student,
        login: true
      };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard/meetings-list/");
    } else if (admin !== undefined) {
      dispatch(setUser(admin));
      dispatch(setLogin(true));

      const user = {
        ...admin,
        login: true
      };

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin/");
    } else {
      setMessage("Invalid username or password, please try again");
    }

    setLoading(false);
  };

  const validateForm = async (e) => {
    e.preventDefault();

    await login();
  };

  return (
    <div className="form-container container column">
      <form
        className="container column border-style"
        action=""
        method="POST"
        onSubmit={validateForm}
      >
        {message && <h3>{message}</h3>}
        <div className="input-container container column">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input-container container column">
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
        <div className="input-container container one-gap">
          <input
            type="checkbox"
            name="is_admin"
            id="is_admin"
            onChange={(e) => {
              setAdmin(e.target.checked);
            }}
          />
          <label htmlFor="is_admin">Admin</label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader className="container center-content" />
          ) : (
            "Login"
          )}
        </button>

        <div className="redirect-signup-container container">
          <p>Don't have an account?</p>
          <Link to="/signup">Register here</Link>
        </div>
      </form>
    </div>
  );
}
