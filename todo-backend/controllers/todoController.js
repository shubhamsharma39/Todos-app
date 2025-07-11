const Todo = require("../models/todoModel");
const logger = require("../utils/logger");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    logger.info(`Fetched todos: ${JSON.stringify(todos)}`);
    res.status(200).json(todos);
  } catch (error) {
    logger.error(`Fetch error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    const savedTodo = await newTodo.save();
    logger.info(`Added todo: ${JSON.stringify(savedTodo)}`);
    res.status(200).json(savedTodo);
  } catch (error) {
    logger.error(`Add error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    logger.info(`Deleted todo: ${JSON.stringify(deleted)}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Delete error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
