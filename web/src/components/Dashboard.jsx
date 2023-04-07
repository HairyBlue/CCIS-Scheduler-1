import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container container flex">
      <LeftPane />
      <RightPane />
    </div>
  );
}
