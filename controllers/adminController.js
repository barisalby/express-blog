const fs = require("fs")
const path = require('path')
const Blog = require("../models/Blogs")

const adminIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Administrator", blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const adminAdd = (req, res) => {
  res.render("add", { title: "Add New Post" })
}

const addPost = async (req, res) => {
  try {
    let imagePath = null
    const uploadPath = path.join("./public/uploads");
    !fs.existsSync(uploadPath) ? fs.mkdirSync(uploadPath) : console.log('Folder already exists.')

    if (req.files && req.files.fileObject) {
        const file = req.files.fileObject
        const filename = file.name

        await file.mv(path.join(uploadPath, filename));
        imagePath = path.join('./uploads/') + filename
    }

    const postData = { ...req.body, image: imagePath }

    const post = await Blog.create(postData)

    res.redirect("/")
    
  } catch (err) {
    console.log(err)
  }
}

const deletePost = (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
  .then((result) => {
    console.log("Content has been removed!");
    res.send("Content has been removed!");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
}

module.exports = {
  adminIndex,
  adminAdd,
  addPost,
  deletePost,
}
