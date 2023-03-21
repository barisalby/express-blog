const Blog = require('../models/Blogs')

const adminIndex = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('admin', { title: 'Administrator', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
}

const adminAdd = (req, res) => {
    res.render('add', { title: 'Add New Post'})
}

const addPost = (req,res) => {
    const newPost = new Blog(req.body) 
     if(req.files) {
         console.log(req.files)
         var file = req.files.file
         var filename = file.name
         console.log(filename)
 
         file.mv('./uploads/' + filename, (err) => {
             if (err) {
                 res.status(err.status).render('error', { title: 'Opps!' })
             } else {
                 console.log('File uploaded!')
             }
         })
     }

     newPost.save()
     .then((result) => {
      res.redirect('/admin')    
     })
     
     .catch((err) => {
      console.log(err)
     })
  }

const deletePost = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result) => {
        console.log('Content has been removed!')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = {
    adminIndex,
    adminAdd,
    addPost,
    deletePost
}
