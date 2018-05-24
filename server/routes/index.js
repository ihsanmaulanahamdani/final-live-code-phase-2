const router = require('express').Router()
const { register, login } = require('../controllers/index.controller')

router.post('/register', register)
      .post('/login', login)

module.exports = router