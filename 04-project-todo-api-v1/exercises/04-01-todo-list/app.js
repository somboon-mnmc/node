import express from 'express';
import { listTodos } from './models/todo.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/todos', (req,res) => {
    const data = listTodos();
    console.log(data);
    res.json({
        data: data
    })
});

app.get('/todos/:userId', (req, res) => {
const id = req.params.userId;
const todo = listTodos[id];

res.json({
    "data": {
      "id": id,
      "title": todo,
    }
  })
})


app.listen(port, () =>{
    console.log("Server is running on port " + port)
})


