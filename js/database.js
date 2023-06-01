const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/noteKeep";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const Schema = mongoose.Schema;

const noteKeepSchema = new Schema({
  userName: String,
  noteText: String,
  noteEdition: String,
});

const Note = mongoose.model("note", noteKeepSchema);

module.exports = {db, Note};
