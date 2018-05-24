const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let bookSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  publisher: String,
  image: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
})

bookSchema.pre('save', function (next) {
  let book = this

  this
    .model('User')
    .update({
        _id: book.author
      }, {
        $push: {
          books: book._id
        }
      }, {
        multi: true
      },
      next
    )
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book