import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Table({ title, callbackFn }) {
  const [list, setList] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    (async () => {
      try {
        const data = await callbackFn(user);

        setList(
          data?.meetings ??
            data?.jsonObject?.meetings ??
            data?.venueObject?.venues ??
            data?.studentObject?.students ??
            data?.teacherObject?.teachers
        );
        setEmpty(false);
      } catch (error) {
        setEmpty(true);
        console.error(error.response);
        console.error(error.response.data);
      }
    })();
  }, [title, callbackFn]);

  return (
    <div className="container column">
      <h3>{title}</h3>
      <ul>
        {!isEmpty &&
          list.map((item, index) => (
            <li key={index}>
              {item?.title ?? item?.fullname ?? item.area}
            </li>
          ))}
      </ul>
    </div>
  );
}
