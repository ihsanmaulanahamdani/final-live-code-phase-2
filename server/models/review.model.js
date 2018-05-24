const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let reviewSchema = new Schema({
  opinion: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }
}, {
  timestamps: true
})

reviewSchema.pre('save', function (next) {
  let review = this

  this
    .model('User')
    .update({
      _id: review.author
    }, {
      $push: {
        reviews: review._id
      }
    }, {
      multi: true
    },
    next
  )

  this
    .model('Book')
    .update({
      _id: review.book
    }, {
      $push: {
        reviews: review._id
      }
    }, {
      multi: true
    },
    next
  )
})

reviewSchema.pre('remove', function (next) {
  let review = this

  this
    .model('User')
    .update({
      _id: review.author
    }, {
      $pull: {
        reviews: review._id
      }
    }, {
      multi: true
    },
    next
  )

  this
    .model('Book')
    .update({
      _id: review.book
    }, {
      $pull: {
        reviews: review._id
      }
    }, {
      multi: true
    },
    next
  )
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review