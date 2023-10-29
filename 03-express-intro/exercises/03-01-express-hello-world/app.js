import express from "express";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', (req, res) => {
    console.log(req.query)
    const id = req.query.id;
    res.send(`Get Product ID: ${id}`);
}); 

app.post('/products', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    res.send(`Post ID: ${id} name: ${name}`)

})

app.get('/products/:productsId', (req, res) => {
    console.log(req.params);
    const id = req.params.productsId;
    res.send(`Get Products ID: ${id}`)

})

app.listen(port,() => {
    console.log("listening on port: " + port);
});
