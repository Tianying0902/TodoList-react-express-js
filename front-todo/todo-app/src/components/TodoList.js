import React from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const deleteTask = (id) => {
    props.deleteTask(id);
  };
  const editTask = (id, value) => {
    props.editTask(id, value);
  };
  const changeTaskStatus = (id) => {
    props.changeTaskStatus(id);
  };
  //   const resetItem = (id) => {
  //     props.resetItem(id);
  //   };
  const items = props.content.map((item) => (
    <TodoItem
      key={item.id}
      className="todo-item"
      text={item.task}
      changeTaskStatus={changeTaskStatus}
      //   resetItem={resetItem}
      deleteTask={deleteTask}
      editTask={editTask}
      id={item.id}
      status={item.completed}
    >
      {item.task}
      <span>X</span>
    </TodoItem>
  ));
  return <div className="todo-list">{items}</div>;
};
export default TodoList;
