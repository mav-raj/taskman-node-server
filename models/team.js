// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateTeam = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        users: joi.string().required()
    });
    return joi.validate(value, schema);
}

// schema
const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }]
    },
    {
        timestamps: true
    }
);

// team model
const Team = mongoose.model("team", teamSchema)

// exports
module.exports = { validateTeam, Team }