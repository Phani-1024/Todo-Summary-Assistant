import React from "react";

const TodoList = ({ todos, onDelete }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.task}
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TodoList;