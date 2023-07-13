const mongoose = require("mongoose");
// const uri = "mongodb://127.0.0.1:27017/noteKeep";

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbName = process.env.DB_NAME
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.novrypn.mongodb.net/${dbName}?retryWrites=true&w=majority`

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

async function db(){
  try {
    await mongoose.connect(uri);
    console.log('Conectado ao banco de dados')
  }catch(err){
    console.log(`Impossivel conectar o Banco de dados: ${err}`)
  }
}

const Schema = mongoose.Schema;

const noteKeepSchema = new Schema({
  userName: String,
  noteText: String,
  noteTitle: String,
  noteEdition: String,
});

const Note = mongoose.model("note", noteKeepSchema);

module.exports = { db, Note };
