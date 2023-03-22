const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        require: true,
    },
    full: {
        type: String,
        required: true,
    },
}, { timestamps: true})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog