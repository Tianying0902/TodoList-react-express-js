import axios from "axios";
import "./App.css";
import React, { useState, useRef } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
function App(props) {
  const [task, setTask] = useState([]);
  const taskVal = useRef(null);

  // useEffect(() => {

  // }, []);
  function changeTaskStatus(id) {
    axios
      .get(`http://localhost:3001/${id}`, { completed: 1 })
      .then((response) => {
        if (response.data[0].completed === 0) {
          console.log(response.data[0].completed);
          axios
            .put(`http://localhost:3001/${id}`, { completed: 1 })
            .then((response) => {
              console.log(response.data);
              showAllTasks();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("wrong");
          axios
            .put(`http://localhost:3001/${id}`, { completed: 0 })
            .then((response) => {
              console.log(response.data);
              showAllTasks();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showActiveTasks() {
    fetch("http://localhost:3001/active")
      .then((res) => res.json())
      .then((data) => setTask(data));
    // console.log(task);
  }
  function showCompletedTasks() {
    fetch("http://localhost:3001/completed")
      .then((res) => res.json())
      .then((data) => setTask(data));
    // console.log(task);
  }

  function showAllTasks() {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => setTask(data));
    console.log(task);
  }
  function editTask(id, value) {
    console.log(id, value);
    axios
      .put(`http://localhost:3001/${id}`, { task: value })
      .then((response) => {
        console.log(response);
        showAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function sendData(e) {
    // The default method will change data as byte and put it into request body
    e.preventDefault();
    axios
      .post("http://localhost:3001", {
        task: taskVal.current.value.trim(),
        completed: false,
      })
      .then(function (response) {
        showAllTasks();
        console.log(response.data);
        taskVal.current.value = "";
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function deleteTask(id) {
    axios
      .delete(`http://localhost:3001/${id}`)
      .then((response) => {
        console.log(response);
        showAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // const status = true;
  function deleteCompletedTask() {
    axios
      .delete(`http://localhost:3001`)
      .then((response) => {
        console.log(response);
        showAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function showRef() {
    console.log(taskVal.current.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <form method="post" action="http://localhost:3001" onSubmit={sendData}>
          <input
            type="text"
            onChange={showRef}
            placeholder="what's the next"
            ref={taskVal}
          />
          <input type="submit" />
        </form>
        <TodoList
          content={task}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          editTask={editTask}
        />
        <div>
          <button onClick={showAllTasks}>All</button>
          <button onClick={showActiveTasks}>Active</button>
          <button onClick={showCompletedTasks}>Completed</button>
          <button onClick={deleteCompletedTask}>Clear Completed</button>
        </div>
      </header>
    </div>
  );
}

export default App;
