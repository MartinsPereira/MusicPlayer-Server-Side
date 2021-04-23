const mongoose = require('mongoose');

const songModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  song: {
    type: Object,
    required: true,
  },
  date: {
    type: Date, 
    default: Date.now
  }
})

module.exports = mongoose.model("Song", songModel);