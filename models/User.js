const mongoose = require('mongoose')

const User = mongoose.model('User', {
  userName: String,
  userEmail: String, 
  userPassword: String
})

module.exports = User;