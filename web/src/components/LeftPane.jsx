import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import "./LeftPane.css";

const DropdownMenu = ({ className, name }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${className} container`}
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
      <ul>
        {
          // To included with contents of the upcoming meetings
        }
      </ul>
    </div>
  );
};

export default function LeftPane() {
  return (
    <div className="leftpane-container container column border-style flex">
      <div className="header-container container">
        <h3>Scheduler</h3>
      </div>
      <div className="dropdown-icon-container">
        <button>
          <GiHamburgerMenu size={18} />
        </button>
      </div>
      <div className="options-container container column">
        <DropdownMenu
          className="upcoming-meetings-container"
          name="Upcoming Meetings"
        />
        <DropdownMenu className="archived-meetings-container" name="Archived" />
      </div>
      <button>Logout</button>
    </div>
  );
}
