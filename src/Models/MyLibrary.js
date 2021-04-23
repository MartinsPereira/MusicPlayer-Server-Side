const mongoose = require('mongoose');

const MyLibrarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  playLists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlayList',
  }],
  albuns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const MyLibrary = mongoose.model('MyLibrary', MyLibrarySchema);

module.exports = MyLibrary;