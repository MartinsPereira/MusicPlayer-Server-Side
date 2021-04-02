const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const MyLibrary = require('../Models/MyLibrary')

const authConfig = require('../config/auth.json');
const { search } = require('./MusicController');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req,res,next){
    const {email} = req.body;
    try{
      if(await User.findOne({email})) return res.status(400).send({error: 'User alredy exists'});
      const user = await User.create(req.body);
      user.password = undefined;
      const library = await MyLibrary.create({user: user.id});
      return res.send({user, token: generateToken({id: user.id})});
    }catch(err){
      return res.status(400).send({error: 'Registration failed'})
    }
  },

  async authenticate(req,res){
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');
    if(!user)return res.status(400).send({error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({error: 'Invalid Password'});

    user.password = undefined;

    res.send({user, token: generateToken({id: user.id})})
  },

  async search(req,res){
    User.find({_id: req.id}).then(pesquisa => {
      res.send(pesquisa)
    }).catch(err => {
      console.log(err)
    })
  }
};