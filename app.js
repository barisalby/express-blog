const express = require('express')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/Blogs')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express()
const dbURL = "mongodb+srv://barisalbayrak:k1iiPOlIMqjnBCsT@nodeblog.8wqzfia.mongodb.net/node-blog?retryWrites=true&w=majority"
mongoose.connect(dbURL, {useUnifiedTopology: true})

.then((result) => app.listen(3000), console.log('Connection Started.'))
.catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/admin', adminRoutes)
app.use('/blog', blogRoutes)


app.get('/about', (req, res) => {
    res.render('about', { title: 'Hakkımızda' })
})

app.get('/about-us', (req, res) => {
    res.status(301).redirect('/about')
})

app.get('/login', (req,res) => {
    res.render('login', {title: 'Login'})
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Opps!' })
})