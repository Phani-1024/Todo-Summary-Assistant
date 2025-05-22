import React, { useEffect, useState } from "react";
import axios from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async (task) => {
    const res = await axios.post("/todos", { task });
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const summarize = async () => {
    try {
      await axios.post("/summarize");
      setStatus("Summary sent to Slack ✅");
    } catch {
      setStatus("Failed to send summary ❌");
    }
    setTimeout(() => setStatus(""), 3000);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo Summary Assistant</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
      <button onClick={summarize}>Generate Summary</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default App;