// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateEvent = value => {
    const schema = joi.object().keys({
        task: joi.string().required(),
        message: joi.string().required(),
        createdFor: joi.string().required(),
    });
    return schema.validate(value);
}

// schema 
const eventSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "task",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        createdFor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }]
    },
    {
        timestamps: true
    }
);

// project model

const Event = mongoose.model("event", eventSchema);

// exports
module.exports = { validateEvent, Event }