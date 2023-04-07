import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    const user = {
      fullname,
      course,
      year,
      email,
      username,
      password
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    );
    const data = await response.json();

    setMessage(data.success_message);

    navigate("/login");
  };

  const validateForm = (e) => {
    e.preventDefault();

    signup();
  };

  return (
    <div className="signup-form-container container column">
      <form
        className="container column border-style"
        action=""
        method="POST"
        onSubmit={validateForm}
      >
        {message !== undefined ? <p>{message}</p> : null}
        <div className="signup-input-container container column">
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Fullname"
            required
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="signup-input-container container column">
          <select
            name="course"
            id="course"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          >
            <option value="">--Please Choose your current course--</option>
            <option value="bscs">BSCS</option>
            <option value="bsit">BSIT</option>
          </select>
        </div>
        <div className="signup-input-container container column">
          <select
            name="year"
            id="year"
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
        <div className="signup-input-container container column">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="signup-input-container container column">
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
        <div className="signup-input-container container column">
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
        <button type="submit">Sign Up</button>

        <div className="redirect-login-container container">
          <p>Already have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
