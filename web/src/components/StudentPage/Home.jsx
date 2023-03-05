import "./Home.css";
import LeftNav from "./LeftNav";
import Schedule from "./Schedule";

export default function Home() {
  return (
    <div className="container student-homepage-container">
      <LeftNav />
      <Schedule />
    </div>
  );
}
