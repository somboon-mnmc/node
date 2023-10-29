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

app.get('/users',  (req, res) => {
  const userList = Object.entries(userDatabase).map((id, name) => ({id , name}))
  res.json({
    data: [userList],
  });
})

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const name = userDatabase[userId];

  if(!userDatabase) {
    res.status(404).send('Error: User not found')
    return
  }

  res.json({
    "data": {
      "id": userId,
      "name": name
    }
  })
})


app.post('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const name = req.body.name;

  if (!userDatabase[userId]) {
    res.json({
      'error': {
        'message': 'User not found test',
      }
    })
    return
  }
  res.json({
    data: {
      'id': userId,
      'name': name
    }
  })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});