const { model, Schema, models } = require("mongoose");

const ContactSchema = new Schema({
    title: {type: String, required: true},
    sent: {type: String, required: true},
    content: {type: String}
})

export const Contact = models.Contact || model('Contact', ContactSchema);
