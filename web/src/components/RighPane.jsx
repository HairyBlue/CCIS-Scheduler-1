import "./RightPane.css";

export default function RightPane() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];

  const date = new Date();

  return (
    <div className="rightpane-container container column">
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
          <button>New Meeting</button>
        </div>
      </div>
      <div className="rightpane-container border-style"></div>
    </div>
  );
}
