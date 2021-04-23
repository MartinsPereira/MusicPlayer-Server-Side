const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
    default: 'Album'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;