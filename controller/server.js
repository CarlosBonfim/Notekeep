require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const { db, Note } = require("./database");
const cors = require("cors");
const bodyparser = require("body-parser");
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



app.use(cors());
app.use(bodyparser.json());


//vai registrar um usuario novo
app.post("/auth/register", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const userExists = await User.findOne({ userEmail: userEmail });
  if (userExists) {
    return res.status(422).json({ msg: "Este e-mail está registrado" });
  }
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(userPassword, salt);

  const user = new User({
    userName: userName,
    userEmail: userEmail,
    userPassword: passwordHash
  });

  try {
    await user.save();
    res.status(200).json({ msg: "Usuario criado" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "USUARIO NÃO CRIADO" });
  }
});


//login do usuario no sistema 
app.post('/auth/login', async (req,res) => {
  const {userEmail, userPassword} = req.body;
  const user = await User.findOne({userEmail: userEmail})
  const verifyPassword = await bcrypt.compare(userPassword, user.userPassword)
  if(!verifyPassword){
    return res.status(422).json({msg:"Senha incorreta"})
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    )
    res.status(200).json({msg:'Autenticação realizada com sucesso', token, userEmail})
  } catch (err) {
    res.status(500).json({msg: 'Houve um erro no servidor', err})
  }
})


//vai buscar usuarios
app.get('/users', checkToken, async (req,res) => {
  try {
    const users = await User.find()
    res.status(200).json({users})
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "USUARIO NÃO ENCONTRADO" });
  }
})


app.get("/notekeep", checkToken, (req, res) => {
  Note.find()
    .then((notes) => res.send(notes))
    .catch((err) => res.status(500).send(err));
});


function checkToken(req,res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(401).json({msg:'Não tem token!'})
  }
  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
  } catch (error) {
    return res.status(400).json({msg: 'Token Invalido', authHeader})
  }
}
app.get("/notekeep/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((notes) => res.send(notes))
    .catch((err) => res.send(err));
});

app.post("/notekeep", (req, res) => {
  const noteTitle = req.body.noteTitle;
  const noteText = req.body.noteText;
  Note.create({ noteTitle: noteTitle, noteText: noteText })
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err));
});

app.put("/notekeep", (req, res) => {
  const noteTitle = req.body.noteTitle;
  const noteText = req.body.noteText;
  const _id = req.body.id;
  Note.findByIdAndUpdate(_id, { noteTitle: noteTitle, noteText: noteText })
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err));
});

app.delete("/notekeep", (req, res) => {
  const id = req.body.id;
  Note.findByIdAndDelete(id)
    .then((notes) => res.status(201).send(notes))
    .catch((err) => res.status(500).send(err));
});

// app.listen(port, () => {
//   console.log(`Executando na porta ${port}`);
// });
db().then(() => {
  app.listen(port, () => {
    console.log(`Executando na porta: ${port}`)
  })
})