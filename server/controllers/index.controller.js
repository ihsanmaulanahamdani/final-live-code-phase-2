const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const User      = require('../models/user.model')

module.exports = {
  register: (req, res) => {
    let { name, email, password } = req.body

    let newUser = new User({
      name,
      email,
      password,
      role: 'user',
      books: [],
      reviews: []
    })

    newUser
      .save()
      .then(user => {
        res
          .status(201)
          .json({
            message: 'Register success!',
            user
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: 'something went wrong',
            err
          })
      })
  },
  login: (req, res) => {
    let { email, password } = req.body

    User
      .findOne({
        email
      })
      .exec()
      .then(user => {
        if (user) {
          User
            .schema
            .methods
            .compareHash(password, user.password, (err, result) => {
              if (!err && result) {
                let token = jwt.sign({ id: user._id, name: user.name, email: user.email }, secretKey)

                res.status(200).json({
                  message: 'login success',
                  token
                })
              } else {
                res.status(400).json({
                  message: 'please login',
                  err
                })
              }
            })
        } else {
          res.status(400).json({
            message: 'please login'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'somthing went wrong',
          err
        })
      })
  }
}