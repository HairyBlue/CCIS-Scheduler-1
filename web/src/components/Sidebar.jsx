import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { setLogin, setUser } from "./features/Profile/userSlice";
import Loader from "./Loader";
import "./Sidebar.css";
import axios from "axios";

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

const Item = ({ isActive, onClick, children }) => {
  return (
    <button className={`${isActive && "highlight"}`} onClick={onClick}>
      {children}
    </button>
  );
};

const LeftPane = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signoutUser = async () => {
    setLoading(true);

    const { data } = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/signout`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    const { success_message } = data;

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
      <div className="options-container container column">
        {/* <Item
          isActive={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
            navigate("/dashboard/meetings-list/pending");
          }}
        >
          Pending Meetings
        </Item> */}
        <Item
          isActive={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
            navigate("/dashboard/meetings-list");
          }}
        >
          Pending Meetings
        </Item>
        <Item
          isActive={activeIndex === 1}
          onClick={() => {
            setActiveIndex(1);
            navigate("/dashboard/meetings-list/upcoming");
          }}
        >
          Upcoming Meetings
        </Item>
        <Item
          isActive={activeIndex === 2}
          onClick={() => {
            setActiveIndex(2);
            navigate("/dashboard/meetings-list/archived");
          }}
        >
          Archived Meetings
        </Item>
      </div>
      <button onClick={signoutUserHandler} disabled={isLoading}>
        {isLoading ? <Loader width={16} height={16} /> : "Log out"}
      </button>
      <div
        className={`rightpane-dropdown-container ${
          showMenu ? "flex-show" : "hide"
        }`}
      >
        <button
          className="container center-content"
          onClick={signoutUserHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader
              className="container center-content disable-scollbar flex"
              stroke="white"
            />
          ) : (
            "Log out"
          )}
        </button>
      </div>
    </div>
  );
};

export default LeftPane;
