const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/Blogs')

const app = express()
const dbURL = "mongodb+srv://barisalbayrak:k1iiPOlIMqjnBCsT@nodeblog.8wqzfia.mongodb.net/node-blog?retryWrites=true&w=majority"
mongoose.connect(dbURL, {useUnifiedTopology: true})
    .then((result) => app.listen(3000), console.log('Connection Started.'))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', { title: 'Anasayfa', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/blog/:id', (req,res) => {
    const id = req.params.id

    Blog.findById(id)
    .then((result) => {
        res.render('blog', {blog: result, title: 'Detay'})
    })

    .catch((err) => {
        res.status(404).render('404', { title: 'Opps!' })
    })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Hakkımızda' })
})

app.get('/about-us', (req, res) => {
    res.status(301).redirect('/about')
})

app.get('/login', (req,res) => {
    res.render('login', {title: 'Login'})
})

app.get('/admin', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('admin', { title: 'Administrator', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/admin/add', (req, res) => {
    res.render('add', { title: 'Add New Post'})
})

app.post('/admin/add', (req,res) => {
   const blog = new Blog(req.body) 

   blog.save()
   .then((result) => {
    res.redirect('/admin')
   })
   
   .catch((err) => {
    console.log(err)
   })
})


app.use((req, res) => {
    res.status(404).render('404', { title: 'Opps!' })
})