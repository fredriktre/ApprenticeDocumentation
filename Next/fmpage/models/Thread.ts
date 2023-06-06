const { model, Schema, models } = require("mongoose");

const ThreadSchema = new Schema({
    title: {type:String, required: true},
    createdDate: {type:String, required: true},
    posts: {type:[String]}
})

export const Thread = models.Thread || model('Thread', ThreadSchema);