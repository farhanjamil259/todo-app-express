import express from "express";
import Todo from "../models/todoModel.js";

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
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

todoRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);

  res.status(200).json({
    message: "Deleted Item",
  });
});

export default todoRouter;
