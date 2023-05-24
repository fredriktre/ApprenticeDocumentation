const { model, Schema, models } = require("mongoose");

const UserSchema = new Schema({
    email:  {type: String, required: true},
    name: {type: String, required: true},
    passcode: {type: String, require: true},
    admin:  {type: Boolean, required: true},
    avatar: {type:String, required: true},
})

export const User = models.User || model('User', UserSchema);