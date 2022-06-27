// load the things we need
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const apiRouter = require('./api/news/detik')
const api1Router = require('./api/news/cnn')
const api2Router = require('./api/animesc')
const api3Router = require('./api/kbbi')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

// Definisikan Router pada path "/api"
app.use('/api/detik', apiRouter)
app.use('/api/cnn', api1Router)
app.use('/api/anime-search/', api2Router)
app.use('/api/kbbi/', api3Router)

app.listen(8080);
console.log('8080 is the magic port');