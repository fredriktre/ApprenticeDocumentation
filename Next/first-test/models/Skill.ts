const { model, Schema, models } = require("mongoose");

const SkillSchema = new Schema({
    category: {type: String, required: true},
    name: {type: String, required: true},
    confidence: {type: Number, required: true}
})

export const Skill = models.Skill || model('Skill', SkillSchema);