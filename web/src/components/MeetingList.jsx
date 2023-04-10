import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

import getMeetingsForCreator from "../api/getMeetings";

const MeetingCard = ({ title, description }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(2);
  }, []);

  return (
    <div className="meeting-card-container container">
      <div className="leftpane-card container column">
        <p>{title}</p>
        <p>{description}</p>
        <div className="time-tracker-container">
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
              alt="clock-icon"
            />
          </div>
          <div>{`${time} hr`}</div>
        </div>
      </div>
      <div className="rightpane-card container">
        <div className="status-indicator-container"></div>
        <p className="status-container">New</p>
      </div>
    </div>
  );
};

const MeetingList = () => {
  const [meetingsList, setMeetingsList] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const { meetings } = await getMeetingsForCreator(user);

      setMeetingsList(meetings);
      setLoading(false);
    })();
  }, []);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const date = new Date();
  return (
    <>
      <div className="rightpane-header container border-style">
        <p>
          Today <br />
          {`${weekday[date.getUTCDay()]}, ${
            month[date.getUTCMonth()]
          }, ${date.getUTCDate()}, ${date.getUTCFullYear()}`}
        </p>

        <div className="addNewMeeting-button-container">
          <div className="img-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2997/2997933.png"
              alt="add-button"
            />
          </div>
          <button
            onClick={(e) => {
              navigate("/dashboard/meetings-list/dashboard-meeting-form");
            }}
            disabled={isLoading}
          >
            New Meeting
          </button>
        </div>
      </div>
      <div className="rightpane-content-container container column border-style flex">
        {meetingsList?.length === 0 && (
          <div className="container center-content max-size">
            Wow such empty...
          </div>
        )}
        {undefined}
        {meetingsList ? (
          meetingsList.map((meeting, index) => (
            <MeetingCard
              key={index}
              title={meeting.title}
              description={meeting.description}
            />
          ))
        ) : (
          <div className="container center-content max-size spinner">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default MeetingList;
