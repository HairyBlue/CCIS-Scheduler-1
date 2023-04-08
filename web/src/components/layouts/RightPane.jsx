import { Outlet } from "react-router-dom";
import "./RightPane.css";

const RightPane = () => {
  return (
    <div className="rightpane-container container column">
      <Outlet />
    </div>
  );
};

export default RightPane;
