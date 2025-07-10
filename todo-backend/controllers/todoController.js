const Todo = require("../models/todoModel");
const logger = require("../utils/logger");

exports.getTodos = async (req, res) => {
    console.log("Fetching the todos from DB");
    try {
        const todos = await Todo.find();
        logger.info(`Fetched all the todos: ${JSON.stringify(todos)}`);
        res.status(200).json(todos);
    } catch (error) {
        logger.error(`Error while fetching the todos: ${error.message}`);
        res.status(500).json({ message: "Something went wrong, please try later" });
    }
};

exports.addTodo = async (req, res) => {
    try {        
        const title = req.body.title;
        logger.info(`Adding a new todo: ${title}`);

        const newTodo = new Todo({ title });
        logger.info(`Adding the todo to DB: ${JSON.stringify(newTodo)}`);

        const savedTodo = await newTodo.save();
        logger.info(`Todo successfully saved: ${JSON.stringify(savedTodo)}`);

        res.status(200).json(savedTodo);
    } catch (error) {
        logger.error(`Error while adding the todos: ${error.message}`);
        res.status(500).json({ message: "Something went wrong, please try later" });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    logger.info(`Request to delete todo with id: ${id}`);
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            logger.warn(`Todo not found with id: ${id}`);
            return res.status(404).json({ message: "Todo not found" });
        }
        logger.info(`Todo deleted successfully: ${JSON.stringify(deletedTodo)}`);
        res.status(204).send(); // No Content
    } catch (error) {
        logger.error(`Error while deleting the todo: ${error.message}`);
        res.status(500).json({ message: "Something went wrong, please try later" });
    }
};
