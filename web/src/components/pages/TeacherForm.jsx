import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TeacherForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const signup = async () => {
    let userData = { fullname, email, username, password };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user.token}`);

    const response = await axios({
      method: "post",
      url: `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/v1/admin/add-teacher`,
      headers,
      data: { ...userData }
    });
    const data = await response.json();

    const { success_message } = data;
    setMessage(success_message);
    navigate("/admin");
  };

  const validateForm = (e) => {
    e.preventDefault();

    signup();
  };

  return (
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
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />
      </div>
      <div className="input-container container column">
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

      <button type="submit">Confirm</button>
    </form>
  );
}
