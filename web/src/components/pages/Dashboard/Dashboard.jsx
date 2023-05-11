import { Outlet } from "react-router-dom";

import Sidebar from "../../Sidebar";
import "./Dashboard.css";

export default function Dashboard() {

  return (
    <div className="dashboard-container container flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
