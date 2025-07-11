const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
