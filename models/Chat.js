const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// data columns
const newsSchema = new Schema({
  author: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Chat = mongoose.model("Chat", newsSchema);

module.exports = Chat;
