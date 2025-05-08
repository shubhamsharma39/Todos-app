const express = require("express");
const router = express.Router();
const { getTodos, addTodo } = require("../controllers/todoController");

router.get("/get-todos", getTodos);      
router.post("/add-todo", addTodo);      

module.exports = router;
