const { model, Schema, models } = require("mongoose");

const VlogSchema = new Schema({
    title: {type:String, required: true},
    desc: {type:String},
    videoURL: {type:String, required: true},
    thumbnailURL: {type:String, required: true}
})

export const Vlog = models.Vlog || model('Vlog', VlogSchema);