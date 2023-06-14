const { model, Schema, models } = require("mongoose");

const CommentSchema = new Schema({
    userID: {type:String, required: true},
    content: {type: String, required: true},
    date: {type:String, required: true},
    postID: {type: String, required: true},
})

export const Comment = models.Comment || model('Comment', CommentSchema);