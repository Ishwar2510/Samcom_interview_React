import React, { useState, useEffect } from "react";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [changed, setChanged] = useState(false);
  const [search, setsearch] = useState("");
  const [serachBased, setsearchBased] = useState("");
  const [toEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState({
    taskname: "",
    oldtaskname: "",
  });
  if (!localStorage.getItem("list")) {
    localStorage.setItem("list", JSON.stringify([]));
  }
  const [input, setInput] = useState({
    taskName: "",
    priority: "",
    status: "not started",
    date: "",
    completed: false,
  });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("list"));
    setTodoList(data);
  }, []);
  useEffect(() => {
    setTodoList((prev) => {
      return [...prev];
    });
  }, [changed]);

  function handleinput(e) {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function addTodo() {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].taskName === input.taskName) {
        alert("task already added");
        return;
      }
    }
    if (input.priority === "") {
      alert("pls set priority");
      return;
    }
    localStorage.setItem("list", JSON.stringify([...todoList, input]));
    setTodoList((prev) => {
      return [...prev, input];
    });
  }
  function setSearchf(e) {
    setsearch(e.target.value);
  }
  function handleSearch(e) {
    setsearchBased(e.target.value);
  }
  function taskStatusChange(name) {
    let data = todoList;

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].taskName)
      if (data[i].taskName === name) {
        data[i].completed = !data[i].completed;
      }
    }
    localStorage.setItem("list", JSON.stringify(data));
    setTodoList(data);
    setChanged((prev) => !prev);
  }
  function deletetodo(tname) {
    let newTodo = todoList.filter((e) => {
      return e.taskName != tname;
    });
    localStorage.setItem("list", JSON.stringify(newTodo));
    setTodoList(newTodo);
  }
  function statusChange(e) {
    let data = todoList;
    console.log(e.target.name);
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].taskName)
      if (data[i].taskName === e.target.name) {
        console.log("changed");
        data[i].status = e.target.value;
        if (e.target.value === "completed") {
          data[i].completed = true;
        } else {
          data[i].completed = false;
        }
      }
    }
    setTodoList(data);
    setChanged((prev) => !prev);
  }
  function Toedit(e) {
    setEdit(true);
    setEditData({ taskname: e.taskName, oldtaskname: e.taskName });
  }
  function saveEdit() {
    let data = todoList;

    console.log(editData.taskname);
    console.log(editData.oldtaskname);
    for (let i = 0; i < data.length; i++) {
      if (data[i].taskName.trim() == editData.oldtaskname.trim()) {
        console.log("hello");
        data[i].taskName = editData.taskname;
        break;
      }
    }
    localStorage.setItem("list", JSON.stringify(data));
    setTodoList(data);
    setEdit(false);
  }
  function handleEdit(e) {
    let data = editData.oldtaskname + " ";

    setEditData({ taskname: e.target.value, oldtaskname: data });
  }

  return (
    <div className="todo">
      <h1>TO DO List</h1>
      <div className="form_container">
        {toEdit ? (
          <div>
            <input value={editData.taskname} onChange={handleEdit}></input>
            <button onClick={saveEdit}>save</button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <input
            onChange={handleinput}
            name="taskName"
            placeholder="add-Todo"
            value={input.taskName}
          ></input>
          <select onChange={handleinput} name="priority">
            <option>set priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <input
            type="date"
            name="date"
            value={input.date}
            onChange={handleinput}
          ></input>
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
      <div className="search_container">
        <input
          placeholder="search for item "
          name="search"
          value={search}
          onChange={setSearchf}
        ></input>
        <select name="priority" onChange={handleSearch}>
          <option> set search</option>
          <option value="taskname">Task name</option>
          <option value="priority">Priority Leavl</option>
        </select>
      </div>
      <div className="data_container">
        <table>
          <thead>
            <tr>
              <td>Task Name</td>
              <td>Priority Level</td>
              <td>Status</td>
              <td>Change Status</td>
              <td>Due Date</td>
              <td>Completed</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {search
              ? todoList
                  .filter((e) => {
                    if (serachBased === "priority") {
                      return e.priority
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else {
                      return e.taskName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }
                  })
                  .map((e) => {
                    return (
                      <tr key={e.taskName}>
                        <td>{e.taskName}</td>
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
                  })
              : todoList.map((e) => {
                  return (
                    <tr key={e.taskName}>
                      <td>
                        {e.taskName}
                        <button style={{borderRadius:"20px"}}
                          onClick={() => {
                            Toedit(e);
                          }}
                        >
                          e
                        </button>
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
        </table>
      </div>
    </div>
  );
}

export default Todo;
