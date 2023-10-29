import express from "express";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/users", (req, res) => {
    const id = req.query.id;
    res.send("User ID:" + id);
})

app.post('/users', (req, res) => {
    const id = req.query.id;
    const name = req.body.name;
    res.send("User ID: " + id + " Name: " + name);
})

app.get("/users/:userId",(req,res) => {
    const id = req.params.userId;
    res.send("User ID: " + id);
})
app.post("/users/:userId", (req,res) => {
    const id = req.params.userId
    const name = req.body.name;
    res.send("User ID: " + id + " name has been updated to " + name)
})  


app.listen(port, ()=> {
    console.log("run on port: " + port);
});