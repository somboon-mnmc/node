import express from "express";
import { findTodo, listTodos, createTodo, updateTodo, updateTodo } from "./models/todo.js";

const app = express();
const port = 8000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/todos", (req, res) => {
  const todos = listTodos();
  res.json({ data: todos });
});

app.get("/todos/:todoId", (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);
  const todo = findTodo(todoId);

  if (!todo) {
    res.status(404).json({ error: { message: "todo not found" } });
    return;
  }

  res.json({ data: todo });
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;

  if (title.length > 30) {
    res
      .status(400)
      .json({ error: { message: "title must not exceed 30 characters" } });
    return;
  }

  const todo = createTodo({ title, desc });

  res.json({ data: todo });
});

app.put("/todos/:todoId", (req, res) => {
  // 1. get the `todoId` params and parse to int
  const todoId = parseInt(req.params.todoId)
  // 2. get the `title` and `desc` from body
  const {title , desc} = req.body
  // 3. send all data to update with `updateTodo`
  const updateTodo = updateTodo({id: todoId, title, desc})
  // 4. if the return from updateTodo is null, response error
  if (!updateTodo) {
    res.status(404).json({error: {message: "failed to update"})
    return
  }
  // 5. response the updatedTodo
  res.json({ data: updateTodo});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
