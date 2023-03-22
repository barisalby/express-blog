const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/login', authController.login_get)

router.post('/login', authController.login_post)

router.get('/signup', authController.signup_get)

router.post('/signup', authController.signup_post)

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/login')
})

module.exports = router