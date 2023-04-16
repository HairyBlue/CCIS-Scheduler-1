import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <header className="admin-header container ">
        <nav>
          <ul className="navlinks-container container one-gap ">
            <li>
              <Link to="/">View Meetings</Link>
            </li>
            <li>
              <Link to="/admin/archived-meetings">View Archived Meetings</Link>
            </li>
            <li>
              <Link to="/admin/list-of-venues">View Venues</Link>
            </li>
            <li>
              <Link to="/admin/list-of-students">View Students</Link>
            </li>
            <li>
              <Link to="/admin/list-of-teachers">View Teachers</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
