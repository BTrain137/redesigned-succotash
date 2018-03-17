const db = require('../models')

// Defining methods for the chat
module.exports = {
  findAll: function (callback) {
    //finds and sorts by oldest data and serves back in an object
    db.Chat
      .find({}) // If there is no query string, it is the empty object {}
      .sort({ date: -1 })
      //call back to user 
      .then(data => callback(data))
      .catch(err => console.log(data)) // Given correctly but erroneous
  },
  //creates and stores messages. 
  create: function (message, callback) {
    // console.log(message)
    db.Chat
      .create(message)
      //call back is given to populate message on board
      .then(data => callback(data))
      .catch(err => console.log(err))
  },
  //untested
  remove: function (id, callback) {
    db.Chat
      .findById({ _id: id })
      .then(data => data.remove())
      .then(data => callback(data))
      .catch(err => console.log(err))
  }
}
