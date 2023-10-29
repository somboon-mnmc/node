import express from "express";
import { isValidName } from "./utils.js";

const app = express();
const port = 8000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/static",express.static("public")); 
// user database variable here:
const userDatabase = {
  20: "Manee",
  21: "Mana",
  22: "Mano",
};


app.get("/users", (req, res) => {
  const users = Object.keys(userDatabase).map((id) => {
    const petUrl = petImageUrl(id)
    return { id, name: userDatabase[id], petUrl: petImageUrl(id)};
  });

  res.json({ data: users });
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const name = userDatabase[userId];

  if (!name) {
    res.status(404).json({
      error: {
        message: "User not found",
      },
    });
    return;
  }

  res.json({
    data: {
      id: userId,
      name,
      petImageUrl: petImageUrl(userId)
    },
  });
});

app.post("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const petUrl = req.body.petUrl;

  if (!userDatabase[userId]) {
    res.status(404).json({
      error: {
        message: "User not found",
      },
    });
    return;
  }

  if (!isValidName(name)) {
    res.status(404).json({
      error: {
        message: "The specified name is invalid",
      },
    });
    return;
  }

  userDatabase[userId] = name;

  res.json({
    data: {
      id: userId,
      name,
      petImageUrl: petImageUrl(userId)
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function petImageUrl(userId) {
  return `http://localhost:8000/images/pet-${userId}.jpg`

}