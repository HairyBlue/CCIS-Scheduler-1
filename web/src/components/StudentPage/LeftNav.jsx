import "./LeftNav.css";

export default function LeftNav() {
  return (
    <div className="container left-nav-container">
      <div className="container user-profile-container">
        <div className="img-profile-container">
          <img src="profile.png" alt="user profile" />
        </div>
        <p>Ikaw Diayni</p>
      </div>
      <div className="divider"></div>
    </div>
  );
}
