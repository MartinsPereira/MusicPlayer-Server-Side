const PlayList = require('../Models/PlayList')
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require("stream").pipeline)
const url = require('url');
const MyLibrary = require('../Models/MyLibrary')

module.exports = {
  async create(req,res,next){

    if(req.body.title == "" || !req.file) return res.send('Por favor preencha todos os campos!')

    if(req.file.detectedFileExtension != ".jpg" && req.file.detectedFileExtension != ".png") return res.send('Por favor escolha uma imagem Válida!');

    const fileName = req.file.originalName + Math.floor(Math.random * 1000) + req.file.detectedFileExtension;

    await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../../public/uploads/${fileName}`))

    let urlServer = url.format({protocol: req.protocol,host: req.get('host') });
    try{
      const playlist = await PlayList.create({...req.body, img: `${urlServer}/uploads/${fileName}`, author: req.id});
      const library = await MyLibrary.findOne().where('user').equals(req.id);
      library.playLists.push(playlist);
      library.save();
      return res.status(201).send(playlist)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async search(req,res,next){
    try{
      const playlisy = await PlayList.find().where('author').equals(req.id).populate(['songs']);
      return res.send(playlisy)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async searchOne(req,res,next){
    try{
      const playlisy = await PlayList.findById(req.params.id).populate([{
        path: 'songs', 
        populate: [{ 
          path: 'author'
        },{
          path: 'album',
        }]
      },'author']);
      return res.send(playlisy)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async addMusic(req,res,next){
    try{
      const musicPlay = await PlayList.findById(req.body.playlistId);
      musicPlay.songs.push(req.body.musicId);
      musicPlay.save()
      return res.send(musicPlay)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async removePlaylist(req,res){
    try{
      const playlists = await PlayList.findByIdAndRemove(req.params.playlistId)
      return res.send();
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async searchAll(req,res,next){
    try{
      const playlist = await PlayList.find({}).populate(['songs']);
      return res.send(playlist)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
};