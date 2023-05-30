const { model, Schema, models } = require("mongoose");

const MembersSchema = new Schema({
    fullname: {type: String, required: true},
    gender: {type: String},
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

export const Members = models.Members || model('Members', MembersSchema);