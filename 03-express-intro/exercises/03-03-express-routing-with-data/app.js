import express from 'express';
const app = express();
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataBase = {
  20: "Michael",
  21: "John",
  22: "piair",
};

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = dataBase[id]

  res.send(`User ID: ${id} (name: ${name})`)
});

app.post("/users/:userId", (req, res) => {
  const id = req.params.userId;
  const name = req.body.name;
  const age = req.body.age;
  if (!dataBase) {
    res.send(`error: no data base`)
    return;
  }

  dataBase[id] = name;
  console.log( new Date() )
  res.send(`User ID: ${id} (name: ${name}) age: ${age}`)
}) 


app.listen(port, () => {
  console.log(`running on port: ${port}`)
})