const Album = require('../Models/Album')
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require("stream").pipeline)
const url = require('url');

module.exports = {
  async create(req,res,next){

    if(req.body.title == "" || !req.file) return res.send('Por favor preencha todos os campos!')

    if(req.file.detectedFileExtension != ".jpg" && req.file.detectedFileExtension != ".png") return res.send('Por favor escolha uma imagem Válida!');

    const fileName = req.file.originalName + Math.floor(Math.random * 1000) + req.file.detectedFileExtension;

    await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../../public/uploads/${fileName}`))

    let urlServer = url.format({protocol: req.protocol,host: req.get('host') });
    try{
      const album = await Album.create({...req.body, img: `${urlServer}/uploads/${fileName}`, author: req.id});
      return res.status(201).send(album)
    }catch(err){
      return res.status(400).send({error: err})
    }
    
  },
  async search(req,res,next){
    try{
      const album = await Album.find().where('author').equals(req.id).populate(['songs']);
      return res.send(album)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async searchOne(req,res,next){
    try{
      const album = await Album.findById(req.params.id).populate([{
        path: 'songs', 
        populate: [{ 
          path: 'author'
        },{
          path: 'album',
        }]
      },'author']);
      return res.send(album)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async searchAll(req,res,next){
    try{
      const album = await Album.find({}).populate(['songs']);
      return res.send(album)
    }catch(err){
      return res.status(400).send({error: err})
    }
  },
  async removeAlbum(req,res){
    try{
      await Album.findByIdAndRemove(req.params.albumId)
      return res.send();
    }catch(err){
      return res.status(400).send({error: err})
    }
  },

};