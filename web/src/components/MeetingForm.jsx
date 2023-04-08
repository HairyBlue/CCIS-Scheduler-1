import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./MeetingForm.css";

export default function MeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(0);
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [venue_id, setVenue] = useState("");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const createMeeting = async () => {
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

    navigate("/dashboard/meetings-list/");
  };

  const validateForm = (e) => {
    e.preventDefault();

    createMeeting();
    navigate("/dashboard/meetings-list/");
  };

  return (
    <form
      className="meeting-form-container container column"
      method="POST"
      action=""
      onSubmit={validateForm}
    >
      <input
        type="text"
        placeholder="Meeting name"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />
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
      <label htmlFor="meeting-date">Meeting Date</label>
      <input
        type="date"
        name="meeting-date"
        id="meeting-date"
        required
        onChange={(e) => {
          setDate(e.target.value);

          const formattedDate = new Date(e.target.value);
          setDay(parseInt(formattedDate.getDate()));
        }}
      />
      <label htmlFor="starting_time">Starting Time:</label>
      <input
        type="time"
        name="starting_time"
        id="starting_time"
        onChange={(e) => {
          setStart(e.target.value);
        }}
      />
      <label htmlFor="ending_time">Ending Time:</label>
      <input
        type="time"
        name="ending_time"
        id="ending_time"
        onChange={(e) => {
          setEnd(e.target.value);
        }}
      />
      <select
        name="meeting_venue"
        id="meeting_venue"
        onChange={(e) => {
          setVenue(e.target.value);
        }}
      >
        <option value="">--Please select a venue--</option>
        <option value="1">Miserior Grounds</option>
        <option value="2">Camp Raymond</option>
      </select>
      <button type="submit">Add Meeting</button>
    </form>
  );
}
