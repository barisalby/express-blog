const express = require('express')
const { blogIndex, blogParams } = require('../controllers/blogController')
const router = express.Router()

router.get('/', blogIndex)
router.get('/:id', blogParams)

module.exports = router