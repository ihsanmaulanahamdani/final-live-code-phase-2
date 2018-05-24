require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const logger   = require('morgan')
const mongoose = require('mongoose')
const port     = process.env.PORT || 3000
mongoose.connect('mongodb://bukubaik:baikbuku@ds233970.mlab.com:33970/bukubaik')

const app = express()

const indexRouter    = require('./routes/index')
const bookRouter = require('./routes/book')
const reviewRouter    = require('./routes/review')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('success connect to database mongoose')
})

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/books', bookRouter)
app.use('/reviews', reviewRouter)

app.listen(port, () => {
  console.log(`Listening on Port ${port}`)
})

module.exports = app