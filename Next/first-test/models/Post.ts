const { model, Schema, models } = require("mongoose");

const PostSchema = new Schema({
    title: {type: String, required: true},
    updated: {type: Date, required: true},
    content: {type: [[]]}
})

export const Post = models.Post || model('Post', PostSchema);
