import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const signup = async () => {
    let user = {};
    let url = "";

    if (!isAdmin) {
      url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/signup`;
      user = {
        fullname,
        course,
        year,
        email,
        username,
        password
      };
    } else {
      url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/admin/signup`;
      user = {
        username,
        password
      };
    }

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();

    const { success_message } = data;
    setMessage(success_message);
    navigate("/login");
  };

  const validateForm = (e) => {
    e.preventDefault();

    signup();
  };

  return (
    <div className="form-container container column">
      <form
        className="container column border-style"
        action=""
        method="POST"
        onSubmit={validateForm}
      >
        {message && <p>{message}</p>}
        <div className="input-container container column">
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Fullname"
            required
            disabled={isAdmin}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="input-container container column">
          <select
            name="course"
            id="course"
            disabled={isAdmin}
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          >
            <option value="">--Please Choose your current course--</option>
            <option value="bscs">BSCS</option>
            <option value="bsit">BSIT</option>
          </select>
        </div>
        <div className="input-container container column">
          <select
            name="year"
            id="year"
            disabled={isAdmin}
            onChange={(e) => {
              setYear(parseInt(e.target.value));
            }}
          >
            <option value="">--Please Choose your current year--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="input-container container column">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            disabled={isAdmin}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
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
            required
            onChange={(e) => {
              setAdmin(e.target.checked);
            }}
          />
          <label htmlFor="is_admin">Admin</label>
        </div>

        <button type="submit">Sign Up</button>

        <div className="redirect-login-container container">
          <p>Already have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
