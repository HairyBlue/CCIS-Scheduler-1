import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { setLogin, setUser } from "../features/Profile/userSlice"
import "./RightPane.css";

const RightPane = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log(userData);

    dispatch(setUser(userData));
    dispatch(setLogin(true));
  }, [])

  return (
    <div className="rightpane-container container column">
      <Outlet />
    </div>
  );
};

export default RightPane;
