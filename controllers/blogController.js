const Blog = require('../models/Blogs')

const blogIndex = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', { title: 'Anasayfa', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
}

const blogParams = (req,res) => {
    const id = req.params.id

    Blog.findById(id)
    .then((result) => {
        res.render('blog', {blog: result, title: result.title})
    })

    .catch((err) => {
        res.status(404).render('404', { title: 'Opps!' })
    })
}

module.exports = {
    blogIndex,
    blogParams
}