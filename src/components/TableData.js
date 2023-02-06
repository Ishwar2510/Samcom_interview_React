import React from "react";

function TableData(data) {
    let todoList = data.todoList
  return (
    <tbody>
      {todoList.map((e) => {
        return (
          <tr key={e.taskName}>
            <td
              onClick={() => {
                Toedit(e);
              }}
            >
              {e.taskName}
            </td>
            <td>{e.priority}</td>
            <td>{e.status}</td>
            <td>
              <select name={e.taskName} onChange={statusChange}>
                <option value="notStarted">notStarted</option>
                <option value="start">start</option>
                <option value="completed">completed</option>
              </select>
            </td>
            <td>{e.date}</td>
            <td>
              <button
                style={
                  e.completed
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
                onChange={() => {
                  taskStatusChange(e.taskName);
                }}
              >
                {" "}
                S
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  deletetodo(e.taskName);
                }}
              >
                D
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableData;
