const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')

const router = require('./Routes/Router');

const app = express()

mongoose.connect("mongodb://localhost:27017/songPlayer",{useNewUrlParser:true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(router)


app.listen(5000, () => console.log('iniciou o servidor!'))