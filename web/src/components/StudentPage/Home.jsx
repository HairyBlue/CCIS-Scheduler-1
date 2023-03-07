import LeftNav from "./LeftNav";
import Schedule from "./Schedule";

import "./Home.css";

export default function Home() {
  return (
    <div className="container student-homepage-container">
      <LeftNav />
      <Schedule />
    </div>
  );
}
