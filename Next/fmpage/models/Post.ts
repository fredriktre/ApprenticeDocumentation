const { model, Schema, models } = require("mongoose");

const PostSchema = new Schema({
    content: {type:String, required: true},
    postDate: {type:String, required: true},
    user: {type:String, required: true},
})

export const Post = models.Post || model('Post', PostSchema);