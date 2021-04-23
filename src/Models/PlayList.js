const mongoose = require('mongoose');

const PlayListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
  img: {
    type: Object,
    required: true,
  },
  followers: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'Playlist'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const PlayList = mongoose.model('PlayList', PlayListSchema);

module.exports = PlayList;