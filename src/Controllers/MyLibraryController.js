const MyLibrary = require('../Models/MyLibrary')
const PlayList = require('../Models/PlayList')
const Album = require('../Models/Album')
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require("stream").pipeline)
const url = require('url');

module.exports = {
  async searchMyLibrary(req, res) {
    try{
      const library = await MyLibrary.findOne({user: req.id}).populate(['playLists','albuns']);
      return res.send(library)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async addPlayList(req, res) {
    try{
      console.log(req.body.playListId)
      const library = await MyLibrary.findOne({user: req.id});
      library.playLists.push(req.body.playListId)
      library.save()
      const playlist = await PlayList.findById(req.body.playListId);
      const result = await PlayList.findByIdAndUpdate(req.body.playListId, {followers: playlist.followers + 1})
      return res.send({library,result})
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async addAlbum(req, res) {
    try{
      const library = await MyLibrary.findOne({user: req.id});
      library.albuns.push(req.body.albumId)
      library.save()
      const album = await Album.findById(req.body.albumId);
      const result = await Album.findByIdAndUpdate(req.body.albumId, {followers: album.followers + 1})
      return res.send({library,result})
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async removePlaylist(req, res) {
    try{
      const library = await MyLibrary.findOne({user: req.id});
      library.playLists.remove(req.body.source.playlistId)
      library.save();
      const playlist = await PlayList.findById(req.body.source.playlistId);
      const result = await PlayList.findByIdAndUpdate(req.body.source.playlistId, {followers: playlist.followers - 1})
      return res.send({library,result});
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async removeAlbum(req, res) {
    try{
      const library = await MyLibrary.findOne({user: req.id});
      library.albuns.remove(req.body.source.albumId)
      library.save();
      const album = await Album.findById(req.body.source.albumId);
      const result = await Album.findByIdAndUpdate(req.body.source.albumId, {followers: album.followers - 1})
      return res.send({library,result});
    }catch(err){
      return res.status(400).send({error: err})
    }
  },

  
};