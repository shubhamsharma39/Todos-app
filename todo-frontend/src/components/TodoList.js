import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

 const fetchTodos = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/get-todos`);
    const data = await res.json();
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data.todos)
      ? data.todos
      : [];
    setTodos(list);
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
};

const addTodo = async (title) => {
  try {
    const res = await fetch(`${BACKEND_URL}/add-todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
  } catch (err) {
    console.error("Error adding todo:", err);
  }
};

const deleteTodo = async (_id) => {
  try {
    await fetch(`${BACKEND_URL}/delete-todo/${_id}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((t) => t._id !== _id));
  } catch (err) {
    console.error("Error deleting todo:", err);
  }
};


  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <ul>
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
