import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

import Loader from "../../Loader";
import getMeetingsForStudentCreator from "../../../utils/student/getMeetingsStudent";
import getMeetingsForTeacherCreator from "../../../utils/teacher/getMeetingsTeacher";

const MeetingCard = ({
  id,
  code,
  title,
  description,
  date,
  start,
  end,
  teacherID,
  postponed,
  archived
}) => {
  const [isLoading, setLoading] = useState(false);

  const s = moment(start, "HH:mm:ss");
  const e = moment(end, "HH:mm:ss");
  const duration = e.diff(s, "hours");

  const timeLeft = moment().to(date);
  const formattedDate = moment(date).format("MMMM Do YYYY");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const onJoinMeetingHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios({
        method: "patch",
        url: `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/api/teacher/${code}/join-meeting`,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const { data } = response;
      const { success_message } = data;
      navigate(`/dashboard/${user.role}/meetings-list`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onPostponeMeetingHandler = (e) => {
    e.preventDefault();

    (async () => {
      try {
        setLoading(true);
        const response = await axios({
          method: "patch",
          url: `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/api/teacher/${code}/archived-meeting`,
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          data: {
            code
          }
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
    navigate(`/dashboard/${code}/decline-form`);
  };

  const onCancelMeetingHandler = (e) => {
    e.preventDefault();

    (async () => {
      try {
        setLoading(true);
        const response = await axios({
          method: "patch",
          url: `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/api/teacher/${code}/archived-meeting`,
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          data: {
            code
          }
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

    navigate(`/dashboard/${code}/decline-form`);
  };

  return (
    <>
      <div className="meeting-card-container container">
        <div className="leftpane-card container column">
          <p>{title}</p>
          <p>{description}</p>
          <div className="time-container container dynamic-flow two-gap">
            <div className="time-tracker-container">
              <div className="img-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
                  alt="clock-icon"
                />
              </div>
              <div>{`Duration: ${duration} ${
                duration !== 1 ? "hrs" : "hr"
              }`}</div>
            </div>
            <div className="time-tracker-container">
              <div className="img-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png"
                  alt="calendar-icon"
                />
              </div>
              <div>{`Time left: ${timeLeft}`}</div>
            </div>
            <div className="time-tracker-container">
              <div className="img-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png"
                  alt="calendar-icon"
                />
              </div>
              <div>{`Date: ${formattedDate}`}</div>
            </div>
          </div>
          {user.role === "teacher" && !teacherID && archived !== 1 && (
            <div className="input-container container one-gap">
              {isLoading ? (
                <Loader className="container center-content disable-scollbar flex" />
              ) : (
                <div className="button-container">
                  <button onClick={onJoinMeetingHandler} disabled={isLoading}>
                    Join Meeting
                  </button>
                </div>
              )}
            </div>
          )}
          {user.role === "teacher" && archived !== 1 && postponed !== 1 && teacherID ? (
            <div className="button-container container one-gap">
              <button onClick={onPostponeMeetingHandler}>
                Postpone Meeting
              </button>
              <button onClick={onCancelMeetingHandler}>Cancel Meeting</button>
            </div>
          ) : null}
        </div>
        <div className="rightpane-card container">
          <div
            className={`status-indicator-container ${
              postponed ? "yellow" : "green"
            }`}
          ></div>
          <p className="status-container">
            {postponed ? "Postponed" : "Pending"}
          </p>
        </div>
      </div>
    </>
  );
};

export default function MeetingList({ url = "pending-meetings/creator" }) {
  const [meetingsList, setMeetingsList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isArchived, setIsArchived] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        let data = null;

        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData?.role === "student") {
          data = await getMeetingsForStudentCreator(userData, url);
        } else if (userData?.role === "teacher") {
          data = await getMeetingsForTeacherCreator(userData, url);
        }

        const { meetings } = data;

        setMeetingsList(meetings);
        setLoading(false);
      } catch (error) {
        setMeetingsList(null);
        setLoading(false);
      }
    })();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [url]);

  return (
    <>
      <div className="rightpane-header container border-style">
        <p>
          Today <br />
          {moment().format("LLLL")}
        </p>

        {user?.role !== "teacher" && (
          <button
            className="addNewMeeting-button-container"
            onClick={(e) => {
              navigate(
                `/dashboard/${user.role}/meetings-list/dashboard-meeting-form`
              );
            }}
            disabled={isLoading}
          >
            <div className="img-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2997/2997933.png"
                alt="add-button"
              />
            </div>
            <p>New Meeting</p>
          </button>
        )}
      </div>
      <div className="rightpane-content-container container column border-style flex ">
        {isLoading ? (
          <Loader className="container center-content disable-scollbar flex" />
        ) : meetingsList ? (
          meetingsList.map((meeting, index) => (
            <MeetingCard
              key={index}
              id={meeting.id}
              code={meeting.code}
              title={meeting.title}
              description={meeting.description}
              date={meeting.date}
              start={meeting.time.start}
              end={meeting.time.end}
              teacherID={meeting.teacherID}
              postponed={meeting.postponed}
              archived={meeting.isArchived}
            />
          ))
        ) : (
          <div className="container center-content max-size">
            Currently No Meetings...
          </div>
        )}
      </div>
    </>
  );
}
