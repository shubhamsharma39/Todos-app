import React, { useState, useEffect } from "react";

import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import BACKEND_URL from "../config/config"; // Make sure this exports your backend base URL

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/get-todos`);
      const data = await response.json();
      setTodos(data); // Actually set the todos
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const addTodo = async (title) => {
    console.log("Adding todo", title);
    try {
      const response = await fetch(`${BACKEND_URL}/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      console.log("Response received", newTodo);
    } catch (error) {
      console.error("Error while creating the todo", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
