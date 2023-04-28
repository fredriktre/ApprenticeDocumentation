const { model, Schema, models } = require("mongoose");

const ContactSchema = new Schema({
    title: {type: String, required: true},
    sent: {type: Date, required: true},
    content: {type: String}
})

export const Contact = models.Contact || model('Contact', ContactSchema);
