import MeetingCard from "./MeetingCard";

import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="container schedule">
      <div className="schedule-header">
        <p>Schedule for this Week</p>
        <div className="divider"></div>
      </div>

      <div className="schedule-meetings-container">
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
      </div>
    </div>
  );
}
