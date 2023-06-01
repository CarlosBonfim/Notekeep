const express = require("express");
const app = express();
const port = 3000;
const { db, Note } = require("./database");

app.get("/notekeep", (req, res) => {
  Note.find()
    .then((notes) => res.send(notes))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Executando na porta ${port}`);
});
