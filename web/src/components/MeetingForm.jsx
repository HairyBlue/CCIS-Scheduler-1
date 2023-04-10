import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Loader from "./Loader";
import "./MeetingForm.css";

export default function MeetingForm() {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(0);
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [venue_id, setVenue] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const today = moment().format("YYYY-MM-DD");

  const createMeeting = async () => {
    setLoading(true);

    const meetingInfo = {
      title,
      description,
      date,
      day,
      start,
      end,
      venue_id
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user.token}`);

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/create-meeting`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(meetingInfo)
      }
    );

    const { success_message } = await response.json();

    console.log(success_message);

    setLoading(false);
  };

  const validateForm = (e) => {
    e.preventDefault();

    // if (!title || !description) {
    //   setMessage("Please provide a title and description");
    //   return;
    // }

    // if (!date || day === 0 || !start || !end) {
    //   setMessage("Please provide dates and duration");
    //   return;
    // }

    // if (!venue_id) {
    //   setMessage("Please provide a venue");
    //   return;
    // }

    createMeeting();
    navigate("/dashboard/meetings-list/");
  };

  return (
    <form
      className="meeting-form-container form-container container column border-style flex"
      method="POST"
      action=""
      onSubmit={validateForm}
    >
      {message && <h3>{message}</h3>}
      <div className="input-container container column">
        <input
          type="text"
          placeholder="Meeting name"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </div>
      <div className="input-container container column">
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Enter meeting description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></textarea>
      </div>
      <div className="input-container container column">
        <label htmlFor="meeting-date">Meeting Date</label>
        <input
          type="date"
          name="meeting-date"
          id="meeting-date"
          min={today}
          required
          onChange={(e) => {
            setDate(e.target.value);
            const formattedDate = new Date(e.target.value);
            setDay(parseInt(formattedDate.getDate()));
          }}
          value={today}
        />
      </div>
      <div className="input-container container column">
        <label htmlFor="starting_time">Starting Time:</label>
        <input
          type="time"
          name="starting_time"
          id="starting_time"
          onChange={(e) => {
            setStart(e.target.value);
          }}
          required
          value="08:00"
        />
      </div>
      <div className="input-container container column">
        <label htmlFor="ending_time">Ending Time:</label>
        <input
          type="time"
          name="ending_time"
          id="ending_time"
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          required
          value="18:00"
        />
      </div>
      <select
        name="meeting_venue"
        id="meeting_venue"
        onChange={(e) => {
          setVenue(e.target.value);
        }}
        required
      >
        <option value="">--Please select a venue--</option>
        <option value="1">Miserior Grounds</option>
        <option value="2">Camp Raymond</option>
      </select>
      <div className="button-container container">
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader width={16} height={16} /> : "Add Meeting"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/dashboard/meetings-list/");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
