import express from "express"
import router from "./routes/authRouter.js";
import connectDB from "./connectDB.js";
import todoRouter from "./routes/todoRouter.js";
import authenticateUser from "./middleware/authenticateUser.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", router)
app.use("/todo", authenticateUser, todoRouter)

app.get("/", (req, res)=>{
    res.send("Hello")
})

app.listen(3000, ()=>{
    console.log("App is live on port 3000");
})