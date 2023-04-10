import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "../Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/meetings-list/");
  }, []);

  return (
    <div className="dashboard-container container flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
