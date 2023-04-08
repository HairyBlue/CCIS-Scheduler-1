import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
          >
            New Meeting
          </button>
        </div>
      </div>
      <div className="rightpane-content-container container column border-style flex">
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
        <MeetingCard
          title={"Meeting Name"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend luctus fringilla. Sed in eros velit. Phasellus sed aliquet eros. Fusce ut orci convallis risus auctor venenatis nec at augue."
        />
      </div>
    </>
  );
};

export default MeetingList;
