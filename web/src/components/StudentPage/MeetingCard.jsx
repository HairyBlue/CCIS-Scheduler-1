import "./MeetingCard.css";

export default function MeetingCard() {
  return (
    <div className="container meeting-card-container">
      <div className="container meeting-information-container">
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>
          Nulla condimentum justo non tortor maximus pulvinar. Sed vitae ipsum
          nec turpis ultrices congue eget quis tellus.
        </p>
      </div>
      <div className="container button-container">
        <button className="view-schedule-button">View</button>
      </div>
    </div>
  );
}
