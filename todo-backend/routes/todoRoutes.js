const express = require("express");
const router = express.Router();
const { getTodos, addTodo } = require("../controllers/todoController");

router.get("/get-todos", getTodos);     

router.post("/add-todo", addTodo);     

// Todo: Implement the logic for handling deletion of todos
// router.delete("/:id",)

module.exports = router;
