// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateMessage = value => {
    const schema = joi.object().keys({
        message: joi.string().required(),
        created_by: joi.string().required()
    });
    return joi.validate(value, schema);
}

// schema 
const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
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