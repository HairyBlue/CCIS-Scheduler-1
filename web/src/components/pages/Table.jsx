import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Table({ title, callbackFn }) {
  const [list, setList] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    (async () => {
      try {
        const data = await callbackFn(user);
        setList(data?.meetings || data?.students);
      } catch (error) {
        console.error(error);
        console.log(error.response.data);
        console.log(error.response.status)
      }
    })();
  }, [title, callbackFn]);

  return (
    <div className="container column">
      <h3>{title}</h3>
      <ul>
        {list && list.map((item, index) => <li key={index}>{item.title}</li>)}
      </ul>
    </div>
  );
}
