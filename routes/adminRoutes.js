const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const { adminIndex, adminAdd, addPost, deletePost } = require('../controllers/adminController')

router.use(express.static('public'))
router.use(fileUpload())

router.get('/', adminIndex)
router.get('/add', adminAdd)
router.post('/add', addPost)
router.delete('/delete/:id', deletePost)

module.exports = router