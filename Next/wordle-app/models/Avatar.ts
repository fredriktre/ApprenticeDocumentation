const { model, Schema, models } = require("mongoose");

const AvatarSchema = new Schema({
    URI: {type:String, required: true}
})

export const Avatar = models.Avatar || model('Avatar', AvatarSchema);