const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const Review    = require('../models/review.model')

module.exports = {
  addReview: (req, res) => {
    let { opinion, book } = req.body
    let { token } = req.headers

    jwt.verify(token, secretKey, (err, decoded) => {
      let newReview = new Review({
        opinion,
        author: decoded.id,
        book
      })

      newReview
        .save()
        .then(review => {
          res
            .status(201)
            .json({
              message: 'Add review success',
              review
            })
        })
        .catch(errors => {
          res
            .status(500)
            .json({
              message: 'Something went wrong!',
              errors
            })
        })
    })
  },
  getAllReview: (req, res) => {
    Review
      .find({})
      .populate('book')
      .exec()
      .then(reviews => {
        res
          .status(200)
          .json({
            message: 'Get all reviews success!',
            reviews
          })
      })
      .then(errors => {
        res
          .status(500)
          .json({
            message: 'Something went wrong!',
            errors
          })
      })
  },
  deleteReview: (req, res) => {
    let { id } = req.params
    let { token } = req.headers

    jwt.verify(token, secretKey, (err, decoded) => {
      Review
        .findOneAndRemove({
          _id: id
        })
        .then(deletedReview => {
          res
            .status(200)
            .json({
              message: 'Delete review success!',
              deletedReview
            })
        })
        .catch(errors => {
          res
            .status(500)
            .json({
              message: 'Something went wrong!',
              errors
            })
        })
    })
  }
}