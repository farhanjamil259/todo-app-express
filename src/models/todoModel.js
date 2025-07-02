import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", schema);
export default Todo;
