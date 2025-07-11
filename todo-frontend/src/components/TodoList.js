import React, { useEffect, useState } from "react";
import BACKEND_URL from "../config/config";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch(`${BACKEND_URL}/get-todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (title) => {
    const res = await fetch(`${BACKEND_URL}/add-todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setTodos([...todos, data]);
  };

  const deleteTodo = async (id) => {
    await fetch(`${BACKEND_URL}/delete-todo/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
