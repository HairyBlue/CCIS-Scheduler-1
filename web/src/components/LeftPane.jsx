import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLogin, setUser } from "./features/Profile/userSlice";
import "./LeftPane.css";

const DropdownMenu = ({ className, name }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`${className} dropdown-container container`}>
      <div
        className="dropdown-menu-container container"
        onClick={() => {
          setShow(!show);
        }}
      >
        <h3>{name}</h3>
        <div className={`img-container ${show ? "rotate" : "return"}`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9455/9455202.png"
            alt="angle-brackets"
          />
        </div>
      </div>
      <ul className={`dropdown-items-container ${show ? "flex-show" : "hide"}`}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

const LeftPane = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signoutUser = async () => {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", user.token);

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
      dispatch(setUser({}));
      localStorage.clear();

      navigate("/login");
    }
  };

  const signoutUserHandler = (e) => {
    e.preventDefault();

    signoutUser();
  };

  return (
    <div className="leftpane-container container column border-style">
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
        <DropdownMenu
          className="upcoming-meetings-container"
          name="Upcoming Meetings"
        />
        <DropdownMenu className="archived-meetings-container" name="Archived" />
      </div>
      <button onClick={signoutUserHandler}>Logout</button>
      <div
        className={`rightpane-dropdown-container ${
          showMenu ? "flex-show" : "hide"
        }`}
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default LeftPane;
