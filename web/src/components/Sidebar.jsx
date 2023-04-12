import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { setLogin, setUser } from "./features/Profile/userSlice";
import Loader from "./Loader";
import "./Sidebar.css";

// const DropdownMenu = ({ className, name }) => {
//   const [show, setShow] = useState(false);

//   return (
//     <div className={`${className} dropdown-container container`}>
//       <div
//         className="dropdown-menu-container container"
//         onClick={() => {
//           setShow(!show);
//         }}
//       >
//         <h3>{name}</h3>
//         <div className={`img-container ${show ? "rotate" : "return"}`}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/9455/9455202.png"
//             alt="angle-brackets"
//           />
//         </div>
//       </div>
//       <ul className={`dropdown-items-container ${show ? "flex-show" : "hide"}`}>
//         <li>Item 1</li>
//         <li>Item 2</li>
//         <li>Item 3</li>
//       </ul>
//     </div>
//   );
// };

const LeftPane = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signoutUser = async () => {
    setLoading(true);
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user.token}`);

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/signout`,
      {
        method: "PATCH",
        headers
      }
    );

    const { success_message } = await response.json();

    if (success_message !== undefined) {
      console.log(success_message);

      dispatch(setLogin(false));
      dispatch(setUser(null));
      localStorage.clear();

      setLoading(false);
      navigate("/login");
    }
  };

  const signoutUserHandler = (e) => {
    e.preventDefault();

    signoutUser();
  };

  return (
    <div className="sidebar container column border-style">
      <div className="header-container container">
        <h3>Scheduler</h3>
      </div>
      <div className="dropdown-icon-container">
        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <GiHamburgerMenu size={18} />
        </button>
      </div>
      <div className={`options-container container column`}>
        <button
          className={`${activeIndex === 0 ? "highlight" : ""}`}
          onClick={(e) => {
            setActiveIndex(0);
            navigate("/dashboard/meetings-list");
          }}
        >
          Upcoming Meetings
        </button>
        <button
          className={`${activeIndex === 1 ? "highlight" : ""}`}
          onClick={(e) => {
            setActiveIndex(1);
            navigate("/dashboard/meetings-list/archived");
          }}
        >
          Archived Meetings
        </button>
        {/* <DropdownMenu
          className="upcoming-meetings-container"
          name="Upcoming Meetings"
        />
        <DropdownMenu className="archived-meetings-container" name="Archived" /> */}
      </div>
      <button onClick={signoutUserHandler} disabled={isLoading}>
        {isLoading ? <Loader width={16} height={16} /> : "Log out"}
      </button>
      <div
        className={`rightpane-dropdown-container ${
          showMenu ? "flex-show" : "hide"
        }`}
      >
        <ul className="container flex">
          <li className="container center-content">
            <button onClick={signoutUserHandler} disabled={isLoading}>
              {isLoading ? <Loader stroke="white" /> : "Log out"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftPane;
