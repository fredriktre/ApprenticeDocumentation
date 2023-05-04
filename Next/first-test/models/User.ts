const { model, Schema, models } = require("mongoose");

const UserSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    passcode: {
        type: String,
        required: true,
    },
    securityLevel: {
        type: String,
        required: true,
    }
})

export const User = models.User || model("User", UserSchema);