const { model, Schema, models } = require("mongoose");

const LicencesSchema = new Schema({
    title: {type: String, required: true},
    forsystem: {type: String, required: true},
    time: {type: Date, required: true}
})

export const Licences = models.Licences || model('Licences', LicencesSchema);