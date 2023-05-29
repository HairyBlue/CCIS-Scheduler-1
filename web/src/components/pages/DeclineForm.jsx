import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./DeclineForm.css";

export default function DeclineForm() {
  const { type, code } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [reasonPostponed, setPostponedReason] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const fetchedUser = JSON.parse(localStorage.getItem("user"));
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${fetchedUser.token}`
          },
          url: `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/api/teacher/${code}/search-meeting`
        });

        setMeeting(response.data?.meetingDetails);
      } catch (error) {
        console.log(error.response.data);
      }
      setUser(JSON.parse(localStorage.getItem("user")));
    })();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    (async () => {
      let data = {};
      if (type !== "cancel") {
        data = {
          date: moment(meeting?.date).format("YYYY-MM-DD"),
          day: meeting?.day,
          start: meeting?.time.start,
          end: meeting?.time.end,
          venue_id: meeting?.venue.id,
          postponed_reason: reasonPostponed
        };
      } else {
        data = { code };
      }

      try {
        setLoading(true);
        const response = await axios({
          method: "patch",
          url: `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/api/teacher/${code}/${
            type !== "cancel" ? "postponed-meeting" : "archived-meeting"
          }`,
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          data: {
            ...data
          }
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

    // try {
    //   const response = await axios({
    //     method: "patch",
    //     headers: {
    //       Authorization: `Bearer ${user.token}`
    //     },
    //     url: `${
    //       import.meta.env.VITE_REACT_APP_BASE_URL
    //     }/api/teacher/${code}/postponed-meeting`,
    //     data: {
    //       date: moment(meeting?.date).format("YYYY-MM-DD"),
    //       day: meeting?.day,
    //       start: meeting?.time.start,
    //       end: meeting?.time.end,
    //       venue_id: meeting?.venue.id,
    //       postponed_reason: reasonPostponed
    //     }
    //   });
    // console.log(response);
    // } catch (error) {
    //   console.log(error.response.data);
    // }

    navigate(`/dashboard/${user.role}/meetings-list`);
  };

  const onCancelHandler = async (e) => {
    e.preventDefault();
    navigate(`/dashboard/${user.role}/meetings-list`);
  };

  return (
    <form
      className="decline-form border-style container column one-gap flex"
      onSubmit={onSubmitHandler}
      method="PATCH"
    >
      {meeting && (
        <div className="meeting-information-container container column">
          <h3>Meeting Date: {moment(meeting.date).format("MMMM DD, YYYY")}</h3>
          <h3>
            Venue: {meeting.venue.area} / Room {meeting.venue.room}
          </h3>
          <h3>
            Duration:{" "}
            {moment(meeting.time.end, "HH:mm:ss").diff(
              moment(meeting.time.start, "HH:mm:ss"),
              "hours"
            )}{" "}
            Hours
          </h3>
          <h3>Description: {meeting.description}</h3>
        </div>
      )}
      <h3>Provide a reason for the decline meeting</h3>
      <textarea
        name="reason"
        id="reason"
        rows="20"
        onChange={(e) => {
          setPostponedReason(e.target.value);
        }}
      ></textarea>
      <div className="button-container container one-gap">
        <button type="submit">Submit</button>
        <button onClick={onCancelHandler}>Cancel</button>
      </div>
    </form>
  );
}
