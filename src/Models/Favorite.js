const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;