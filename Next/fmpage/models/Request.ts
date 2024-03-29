const { model, Schema, models } = require("mongoose");

const RequestSchema = new Schema({
    email: {type: String, required: true},
    fullname: {type: String, required: true},
    gender: {type: String, required: true},
    birthdate: {type: String},
    deathdate: {type: String},
    bornin: {type: String},
    diedin: {type: String},
    father: {type: String},
    mother: {type: String},
    extrainfo: {type: String},
    children: {type: Array},
    imageIds: {type: Object}
})

export const Request = models.Request || model('Request', RequestSchema);