const express = require('express')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/Blogs')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

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
app.use(cookieParser())

app.get('*', checkUser)

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/', authRoutes)
app.use('/admin', requireAuth , adminRoutes)
app.use('/blog', blogRoutes)


app.get('/about', (req, res) => {
    res.render('about', { title: 'Hakkımızda' })
})

app.get('/about-us', (req, res) => {
    res.status(301).redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Opps!' })
})