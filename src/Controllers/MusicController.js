const Song = require('../Models/Song');
const Album = require('../Models/Album');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require("stream").pipeline)
const url = require('url');
const PlayList = require('../Models/PlayList');



module.exports = {
  async create(req,res,next){
    
    if(req.body.title == "" || !req.file) return res.send('Por favor preencha todos os campos!')

    if(req.file.detectedFileExtension != ".mp3") return res.send('Por favor escolha uma musica Válida!');

    const fileName1 = req.file.originalName + Math.floor(Math.random * 1000) + req.file.detectedFileExtension;

    await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../../public/uploads/${fileName1}`))
    let urlServer = url.format({protocol: req.protocol,host: req.get('host') });


    try{
      const createdMusic = await Song.create({
        title: req.body.title,
        author: req.id,
        album: req.body.album,
        song: `${urlServer}/uploads/${fileName1}`,
      })
      const album = await Album.findById(req.body.album);
      album.songs.push(createdMusic)
      album.save()
      
      /*
      const createdMusic = await Song.create({
        title: titulo,
        author: req.id,
        album: req.body.album,
        img: `${urlServer}/uploads/${fileName}`,
        song: `${urlServer}/uploads/${fileName1}`,
      })*/
      return res.status(201).send(createdMusic)
    }catch(err){
      res.status(400).send(err)
    }
  },
  
  async search(req,res){
    Song.find({}).then(pesquisa => {
      res.send(null)
    }).catch(err => {
      console.log(err)
    })
  },
  async removeMusic(req,res){
    try{
      const playlists = await PlayList.findById(req.body.source.playListId).populate(['songs'])
      await playlists.songs.remove({_id: req.body.source.musicId})
      playlists.save()
      return res.send()
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  

};