import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TeacherForm() {
  const [area, setArea] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const addVenueHandler = async () => {
    const { data } = await axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/admin/add-venue`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: { area, room }
    });

    const { success_message } = data;
    setMessage(success_message);
    navigate("/admin");
  };

  const validateForm = (e) => {
    e.preventDefault();

    addVenueHandler();
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
          name="venue_name"
          id="venue_name"
          placeholder="Venue Name"
          required
          onChange={(e) => {
            setArea(e.target.value);
          }}
        />
      </div>
      <div className="input-container container column">
        <input
          type="text"
          name="room"
          id="room"
          placeholder="Room"
          required
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </div>

      <div className="button-container container center-content">
        <button className="flex"type="submit">Confirm</button>
      </div>
    </form>
  );
}
