import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "../Loader";
import { setUser, setLogin } from "../features/Profile/userSlice";

import "./Forms.css";
import logoImage from "/ccis-logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [isStudent, setStudent] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);

    const url = isAdmin
      ? `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/admin/login`
      : `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/${
          isStudent ? "student" : "teacher"
        }/login`;

    let response = null;

    try {
      response = await axios({
        method: "post",
        url: url,
        data: {
          username,
          password
        }
      });
    } catch (error) {
      setMessage(error.response.data);
      setLoading(false);
    }

    const { data } = response;

    if (data?.student !== undefined) {
      const { success_message, student } = data;
      dispatch(setUser(student));
      dispatch(setLogin(true));

      const studentData = {
        ...student,
        login: true
      };

      localStorage.setItem("user", JSON.stringify(studentData));

      navigate("/dashboard/student/meetings-list/");
    } else if (data?.admin !== undefined) {
      const { success_message, admin } = data;
      dispatch(setUser(admin));
      dispatch(setLogin(true));

      const adminData = {
        ...admin,
        login: true
      };

      localStorage.setItem("user", JSON.stringify(adminData));
      navigate("/admin/");
    } else if (data?.teacher !== undefined) {
      const { success_message, teacher } = data;
      dispatch(setUser(teacher));
      dispatch(setLogin(true));

      const teacherData = {
        ...teacher,
        login: true
      };

      localStorage.setItem("user", JSON.stringify(teacherData));

      navigate("/dashboard/teacher/meetings-list/");
    }

    setLoading(false);
  };

  const validateForm = async (e) => {
    e.preventDefault();

    await login();
  };

  return (
    <div
      className="form-container container column"
    >
      <form
        className="container column border-style center-horizontally"
        action=""
        method="POST"
        onSubmit={validateForm}
      >
        <div className="img-container">
          <img src={logoImage} alt="ccis-logo" />
        </div>
        {message && <h3 className="message-container">{message}</h3>}
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
        <div className="container one-gap">
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
          <div className="input-container container one-gap">
            <input
              type="checkbox"
              name="is_teacher"
              id="is_teacher"
              onChange={(e) => {
                setStudent(!e.target.checked);
              }}
            />
            <label htmlFor="is_teacher">Teacher</label>
          </div>
        </div>
        <button className="flex width-max" type="submit" disabled={isLoading}>
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
