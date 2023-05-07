import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { setLogin, setUser } from "../features/Profile/userSlice";
import "./Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      navigate("/login");
    } else if (user.role !== "admin") {
      dispatch(setUser(user));
      dispatch(setLogin(true));

      navigate(`/dashboard/${user.role}/meetings-list`);
    } else if (user.role === "admin") {
      dispatch(setUser(user));
      dispatch(setLogin(true));

      navigate("/admin");
    }
  }, []);

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
            <li>
              <Link to="/admin/add-teacher">Add Teacher</Link>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();

                if (admin.role === "admin") {
                  dispatch(setLogin(false));
                  dispatch(setUser(null));
                  localStorage.clear();
                  navigate("/login");
                }
              }}
            >
              Log out
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
