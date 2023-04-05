import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
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

  return (
    <div className="leftpane-container container column border-style flex">
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
      <button>Logout</button>
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
