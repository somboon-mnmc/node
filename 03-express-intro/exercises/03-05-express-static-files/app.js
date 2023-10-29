import express from "express";
import { isValidName } from "./utils.js";

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); // for
// user database variable here:
const userDatabase = {
  20: "Manee",
  21: "Mana",
  22: "Mano",
};

app.get("/users", (req,res) => {
  const users = Object.keys(userDatabase).map((id)=> {
    return {
      id,
      name: userDatabase[id],
      petUrl: imageUrl(id)
    }
  });
  res.json({
    data: users
  })
})

app.get("/users/:usersId", (req, res) => {
  const usersId= req.params.usersId;
  const user = {id: usersId, name: userDatabase[usersId], petUrl: imageUrl(usersId)}

  res.json({data: user})

})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function imageUrl(id) {
  return `http://localhost:8000/images/pet-${id}.jpg`
}