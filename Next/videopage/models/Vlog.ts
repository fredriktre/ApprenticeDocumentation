const { model, Schema, models } = require("mongoose");

const VlogSchema = new Schema({
    URI: {type:String, required: true}
})

export const Vlog = models.Vlog || model('Vlog', VlogSchema);