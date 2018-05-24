const router = require('express').Router()
const { addReview, getAllReview, deleteReview } = require('../controllers/review.controller')
const { loginAuthentication } = require('../middlewares/auth')

router.post('/create', loginAuthentication, addReview)
      .get('/', getAllReview)
      .delete('/delete/:id', loginAuthentication, deleteReview)

module.exports = router