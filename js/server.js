const express = require("express");
const app = express();
const port = 3000;
const { db, Note } = require("./database");
const cors = require("cors");
const bodyparser = require('body-parser')

app.use(cors());
app.use(bodyparser.json())

app.get("/notekeep", (req, res) => {
  Note.find()
    .then((notes) => res.send(notes))
    .catch((err) => res.status(500).send(err));
});

app.get('/notekeep/:id', (req,res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(notes =>res.send(notes))
    .catch(err => res.send(err))
})

app.post("/notekeep", (req, res) => {
  const noteTitle = req.body.noteTitle;
  const noteText = req.body.noteText;
  Note.create({ noteTitle: noteTitle, noteText: noteText })
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err));
});


app.listen(port, () => {
  console.log(`Executando na porta ${port}`);
});
