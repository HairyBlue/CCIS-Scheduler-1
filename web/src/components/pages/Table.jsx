import { useState } from "react";
import { useEffect } from "react";

export default function Table({ title, callbackFn }) {
  const [students, setStudents] = useState(null);
  const [meetings, setMeetings] = useState(null);

  useEffect(() => {
    const data = callbackFn();

    if (data?.students) {
      setStudents(data.students);
    } else if (data?.meetings) {
      setMeetings(data.meetings);
    } else {
      console.log("None");
    }
  }, [title, callbackFn]);

  return (
    <div className="container column">
      <h3>{title}</h3>
      <ul>
        <li>Lorem ips</li>
        <li>Lorem ips</li>
        <li>Lorem ips</li>
      </ul>
    </div>
  );
}
