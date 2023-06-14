const { model, Schema, models } = require("mongoose");

const BlogSchema = new Schema({
    title: {type:String, required: true},
    content: {type: Object, required: true},
    date: {type:String, required: true},
    imageLinks: {type: Array},
})

export const Blog = models.Blog || model('Blog', BlogSchema);