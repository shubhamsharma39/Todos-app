const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo, // ✅ Import deleteTodo controller
} = require("../controllers/todoController");

// ✅ Get all todos
router.get("/get-todos", getTodos);

// ✅ Add a new todo
router.post("/add-todo", addTodo);

// ✅ Delete a todo by ID
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
