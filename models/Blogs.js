const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    image: {
        type: String,
        required: true,
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