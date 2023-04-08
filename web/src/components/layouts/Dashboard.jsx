import LeftPane from "../LeftPane";
import RightPane from "./RightPane";
import "./Dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/meetings-list/");
  }, []);

  return (
    <div className="dashboard-container container flex">
      <LeftPane />
      <Outlet />
    </div>
  );
}
