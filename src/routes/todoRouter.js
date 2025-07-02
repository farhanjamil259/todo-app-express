import express from "express";
import Todo from "../models/todoModel.js";

const todoRouter = express.Router();

todoRouter.get("/",async (req, res) => {
  const foundTodo = await Todo.find({ user: req.user._id });
  res.status(200).json(foundTodo);
});


todoRouter.post("/", async (req, res) => {
  const { title } = req.body;

  const newTodo = new Todo({
    title: title,
    user: req.user._id,
  });

  await newTodo.save();

  res.status(201).json(newTodo);
});

export default todoRouter;
