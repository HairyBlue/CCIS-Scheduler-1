import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { setLogin, setUser } from "../features/Profile/userSlice";

import { read, writeFileXLSX } from "xlsx";

import "./Navbar.css";
import axios from "axios";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user.user);

  const onLogoutHander = (e) => {
    e.preventDefault();

    if (admin.role === "admin") {
      dispatch(setLogin(false));
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/login");
    }
  };

  const onExportToExcel = async (e) => {
    try {
      const { data } = await axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${admin.token}`
        },
        responseType: "arraybuffer",
        url: `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/api/v1/admin/download-excel-sheet`
      });

      const workbookData = new Uint8Array(data);
      const workbook = read(workbookData);

      console.log(workbook);

      // const href = URL.createObjectURL(data);

      // console.log(data, href);

      // window.open(href);

      writeFileXLSX(workbook, "ccis-scheduler.xlsx");
    } catch (error) {
      console.error(error);
    }

    // const { meetings } = await getAllArchivedMeetings(admin);
    // const archivedMeetings = await getAllMeetings(admin);
    // const { studentObject } = await getAllStudents(admin);
    // const { teacherObject } = await getAllTeachers(admin);
    // const { venueObject } = await getAllVenues(admin);

    // let meetingsWorksheet = XLSX.utils.json_to_sheet(meetings);

    // console.log(meetingsWorksheet);

    // console.log(
    //   meetings,
    //   archivedMeetings.meetings,
    //   studentObject.students,
    //   teacherObject.teachers,
    //   venueObject.venues
    // );
  };

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
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/">View Meetings</Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/admin/archived-meetings">
                  View Archived Meetings
                </Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/admin/list-of-venues">View Venues</Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/admin/list-of-students">View Students</Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/admin/list-of-teachers">View Teachers</Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button>
                <Link to="/admin/add-teacher">Add Teacher</Link>
              </button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button onClick={onExportToExcel}>Export to Excel</button>
            </li>
            <li className="button-container invert-color transparent-background">
              <button onClick={onLogoutHander}>Log out</button>
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
