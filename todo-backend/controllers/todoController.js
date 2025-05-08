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
