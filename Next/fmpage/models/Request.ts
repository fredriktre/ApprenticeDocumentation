const { model, Schema, models } = require("mongoose");

const RequestSchema = new Schema({
    email: {type: String, required: true},
    fullname: {type: String, required: true},
    gender: {type: String},
    birthdate: {type: String},
    bornin: {type: String},
    diedin: {type: String},
    father: {type: String},
    mother: {type: String},
    extrainfo: {type: String},
    children: {type: Array}

})

export const Request = models.Request || model('Request', RequestSchema);