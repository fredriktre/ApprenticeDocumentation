const { model, Schema, models } = require("mongoose");

const StatusSchema = new Schema({
    status: {type: String},
})

export const Status = models.Status || model('Status', StatusSchema);
