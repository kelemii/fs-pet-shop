import express from "express";
import morgan from "morgan";
import fs from "fs";
import pg from "pg";

const PORT = 3000;
const app = express();
const pool = new pg.Pool({
  database: "petshop",
  port: 5432, // this is default, local host
});

app.use(express.json()); //middleware
app.use(morgan('combined'));

// gets all pets
app.get("/pets", (req, response) => {
  pool.query("SELECT * FROM pets").then((res) => {
    response.send(res.rows);
});

});
// gets one pet
app.get("/pets/:id", (req, response) => {
  const { id } = req.params;
  let identify = parseInt(id);
  pool.query(`SELECT * FROM pets WHERE id = $1;`, [identify]).then((res) => {
    if (res.rows[0]) {
      response.send(res.rows[0]);
    } else {
      response.status(404).send(`invalid index given: ${id}`);
    }
});
});

// deletes one pet
app.delete("/pets/:id", (req,res) => {
  const id = req.params.id;
  pool.query('DELETE FROM pets WHERE id = $1', [id]).then(data => {
    console.log('Deleted ' + data.rows[0]);
    res.send(data.rows[0]);
  })
})

//makes new pet
app.post("/pets", (req, response) => {
  const { name, age, kind} = req.body;
pool.query("INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3) RETURNING*;", [name, age, kind]).then((res) => {
    response.send(res.rows[0]);
});
});
//updates existing pet
app.patch("/pets/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, kind} = req.body;
  pool.query(`
  UPDATE pets SET
  name = COALESCE($1, name),
  age = COALESCE($2, age),
  kind = COALESCE($3, kind)
  WHERE id = $4
  RETURNING *;
  `, [name, age, kind, id])
  .then((result) => {
    res.status(204).send(result.rows);
  });
});


app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile('./pets.json', (err,data) => {
    let pets = JSON.parse(data);
    pets[parseInt(id)]
    res.send(req.body)
  })
});

app.delete("./pets.json/delete/:id");

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
