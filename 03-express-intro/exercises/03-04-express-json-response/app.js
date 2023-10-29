import express from "express";
const app = express();
const port = 8000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// user database variable here:
const userDatabase = {
  20: "Manee",
  21: "Mana",
  22: "Mano",
};

app.get('/users', (req, res) => {
  const usersList = Object.entries(userDatabase).map(([id , name]) => ({ id, name }) )
  res.json({data: usersList});
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const name = userDatabase[userId];

  if (!name) {
    res.send(`Error User ID ${userId} not found`);
    return;
  }

  res.json({
    "data": {
      "id": userId,
      "name": name
    }
  });
});

app.post("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const name = req.body.name;

  if (!userDatabase[userId]) {
    res.status(404).json({
      "error": {
        "message": "User not found"
      }
    })
    return;
  }

  userDatabase[userId] = name;

  res.json({
    "data": {
      "id": userId,
      "name": name
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});