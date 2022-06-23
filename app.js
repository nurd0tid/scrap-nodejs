// load the things we need
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const apiRouter = require('./api/news/detik')
const api1Router = require('./api/news/cnn')
// const api1Router = require('./api/kbbi')
// const api1Router = require('./routes/apiOngkir')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// app.use('/assets',express.static(__dirname + '/public/assets'));

// Definisikan Router pada path "/api"
app.use('/api/news/detik', apiRouter)
app.use('/api/news/cnn', api1Router)

app.listen(8080);
console.log('8080 is the magic port');