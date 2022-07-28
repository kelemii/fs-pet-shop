import express from 'express';
import fs from "fs";
const app = express();
const PORT = 8000;

app.use(express.json());
app.get('/pets', (req,res) => {
    fs.readFile('./pets.json', (err, data) => {
        const pets = JSON.parse(data);
        res.send(pets);
    })
});
app.get('/pets/:id', (req,res) => {
    fs.readFile('./pets.json', (err, data) => {
        const pets = JSON.parse(data);
        // console.log(req.params);
        let id = parseInt(req.params.id);
        if (pets[id]) {
            res.send(pets[id]);
        } else {
            res.status(404).send(`invalid index given: ${id}`);

        }
    })
});

app.post('/pets', (req,res) => {
    fs.readFile('./pets.json', (err, data) => {
        const pets = JSON.parse(data);
        console.log(req.body);
        let input = req.body
        pets.push(input);
        res.send(pets[pets.length-1]);
        fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
            if (err) console.log(err);
            console.log("wrote file")
        })
    })
})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });


app.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
});