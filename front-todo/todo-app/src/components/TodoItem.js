import { React, useState } from "react";
import "./assets/Item.css";
const TodoItem = (props) => {
  const [status, setStatus] = useState(props.status);
  const [content, setContent] = useState(true);
  const changeContent = (props) => {
    setContent(!content);
  };
  const changeTaskStatus = () => {
    setStatus(!status);
    console.log(status);
    props.changeTaskStatus(props.id);
  };

  const deleteTask = () => {
    props.deleteTask(props.id);
  };
  const editTask = (event) => {
    if (event.keyCode === 13) {
      let value = document.getElementById(props.id).value;
      setContent(!content);
      props.editTask(props.id, value);
    }
  };
  return content ? (
    <li className="todo-item" onDoubleClick={changeContent}>
      <input
        type="checkbox"
        onClick={changeTaskStatus}
        //   onDoubleClick={resetItem}
        defaultChecked={status}
      />
      <p style={{ textDecoration: status ? "Line-through" : "" }}>
        {props.text}
      </p>
      <button className="delete-btn" onClick={deleteTask}>
        delete
      </button>
    </li>
  ) : (
    <li className="todo-item" onDoubleClick={changeContent}>
      <input type="checkbox" onClick={changeTaskStatus} />
      <input id={props.id} defaultValue={props.text} onKeyDown={editTask} />
      <button className="delete-btn" onClick={deleteTask}>
        delete
      </button>
    </li>
  );
};
export default TodoItem;
