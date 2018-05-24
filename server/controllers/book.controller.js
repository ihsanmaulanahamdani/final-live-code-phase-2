const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const Book      = require('../models/book.model')

module.exports = {
  addBook: (req, res) => {
    let { title, publisher } = req.body
    let { token } = req.headers

    jwt.verify(token, secretKey, (err, decoded) => {
      let newBook = new Book({
        title,
        author: decoded.id,
        publisher,
        image: req.file.cloudStoragePublicUrl,
        reviews: []
      })

      newBook
        .save()
        .then(book => {
          res
            .status(201)
            .json({
              message: 'Add book success',
              book
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
  getAllBook: (req, res) => {
    Book
      .find({})
      .populate('author')
      .exec()
      .then(books => {
        res
          .status(200)
          .json({
            message: 'Get all books success!',
            books
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
  },
  deleteBook: (req, res) => {
    let { id } = req.params
    let { token } = req.headers

    console.log('masuk sini');

    jwt.verify(token, secretKey, (err, decoded) => {
      Book
        .findOneAndRemove({
          _id: id
        })
        .then(deletedBook => {
          res
            .status(200)
            .json({
              message: 'Delete book success!',
              deletedBook
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