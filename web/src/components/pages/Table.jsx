import { useState } from "react";
import { useEffect } from "react";

export default function Table({ title, callbackFn }) {
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);

  const CreateRow = (item, index) => {
    let row = null;

    row = (
      <tr key={index} >
        {columns.map((column, index) => {
          if (column === "image" && !item[column]) {
            return <td className="border padded-sm" key={index}>None</td>;
          }

          if (item[column]?.start) {
            return (
              <td className="border padded-sm"
                key={index}
              >{`${item[column].start} - ${item[column].end}`}</td>
            );
          }

          if (item[column]?.fullname) {
            return <td className="border padded-sm" key={index}>{item[column].fullname}</td>;
          }

          if (item[column]?.area) {
            return (
              <td className="border padded-sm"
                key={index}
              >{`${item[column].area} / Room ${item[column].room}`}</td>
            );
          }

          return <td className="border padded-sm" key={index}>{item[column]}</td>;
        })}
      </tr>
    );

    return row;
  };


  useEffect(() => {
    (async () => {
      try {
        let parsedList = [];
        let parsedColumns = [];

        const user = JSON.parse(localStorage.getItem("user"));

        const data = await callbackFn(user);

        const newList =
          data?.meetings ??
          data?.jsonObject?.meetings ??
          data?.venueObject?.venues ??
          data?.studentObject?.students ??
          data?.teacherObject?.teachers;

        newList.forEach((item) => parsedList.push(item));
        Object.keys(newList[0]).forEach((item) => parsedColumns.push(item));

        setList(parsedList);
        setColumns(parsedColumns);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [title, callbackFn]);

  return (
    <div>
      <table className="padded-sm">
        <thead>
          <tr>
            <th className="border" colSpan={columns.length}>{title}</th>
          </tr>
        </thead>
        <tbody className="border">
          <tr>
            {columns.length !== 0 &&
              columns.map((column, index) => <th className="border" key={index}>{column}</th>)}
          </tr>
          {list.length !== 0 && list.map(CreateRow)}
        </tbody>
      </table>
    </div>
  );
}
