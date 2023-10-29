/*
Objective: Understand how to use multer to upload images

Exercise:
- Update Postman to have "Upload Todo Image" API.
- Update route to be able to upload image.
- Save the image to the folder `./public/uploads`
- Name the image with uuidv4 to avoid conflict.
- Return the image path to the client.
- Ensure the image can be accessed by the client.

Challenge:
1. Question: Why do we need to use uuidv4 to name the image?
2. Question: If not using uuidv4, what is the alternative?
3. Try to implement the alternative for file naming, not using uuidv4.
*/

import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import {
  findTodo,
  listTodos,
  createTodo,
  updateTodo,
  partialUpdateTodo,
  deleteTodo,
  filterTodosByDone,
} from "./models/todo.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const name = uuidv4();
    const extension = file.mimetype.split("/")[1];
    const filename = `${name}.${extension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

const app = express();
const port = 8000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.post("/todos/:todoId/uploads", upload.single("image"), (req, res) => {
  const { filename } = req.file;
  res.json({
    data: {
      path: `/uploads/${filename}`,
    },
  });
});

app.get("/todos", (req, res) => {
  const isDone = req.query.isDone;

  if (isDone) {
    // convert isDone to boolean
    const isDoneBool = isDone === "true";
    const todos = filterTodosByDone(isDoneBool);
    res.json({ data: todos });
    return;
  }

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
  const todoId = parseInt(req.params.todoId);

  // 2. get the `title` and `desc` from body
  const { title, desc } = req.body;

  // 3. send all data to update with `updateTodo`
  const updatedTodo = updateTodo({ id: todoId, title, desc });

  // 4. if the return from updateTodo is null, response error
  if (!updatedTodo) {
    res.json({ error: { message: "failed to update" } });
    return;
  }

  // 5. response the updatedTodo
  res.json({ data: updatedTodo });
});

app.patch(`/todos/:todoId`, (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);
  const { title, desc, isDone } = req.body;

  const updatedTodo = partialUpdateTodo({
    id: todoId,
    title,
    desc,
    isDone,
  });

  if (!updatedTodo) {
    res.json({ error: { message: "failed to update" } });
    return;
  }

  res.json({ data: updatedTodo });
});

app.delete("/todos/:todoId", (req, res) => {
  const todoId = parseInt(req.params.todoId, 10);
  const todo = deleteTodo(todoId);

  if (!todo) {
    res.status(404).json({ error: { message: "failed to delete" } });
    return;
  }

  res.json({ data: todo });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
