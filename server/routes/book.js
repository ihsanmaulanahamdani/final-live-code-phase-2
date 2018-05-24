const router = require('express').Router()
const { addBook, getAllBook, deleteBook } = require('../controllers/book.controller')
const { loginAuthentication } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require('../helpers/image')

router.post('/create', loginAuthentication, multer.single('image'), sendUploadToGCS, addBook)
      .get('/', getAllBook)
      .delete('/delete/:id', loginAuthentication, deleteBook)

module.exports = router