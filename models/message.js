// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateMessage = value => {
    const schema = joi.object().keys({
        message: joi.string().required(),
        task: joi.string().required(),
        created_by: joi.string(),
        created_at: joi.string(),
    });
    return schema.validate(value);
}

// schema 
const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "task",
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// project model

const Message = mongoose.model("message", messageSchema);

// exports
module.exports = { validateMessage, Message }