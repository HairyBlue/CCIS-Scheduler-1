import MeetingCard from "./MeetingCard";

import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="container schedule">
      <div className="container schedule-header">
        <p>Schedule for this Week</p>
        <div className="divider"></div>
      </div>

      <div className="container schedule-meetings-container">
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
      </div>
    </div>
  );
}
