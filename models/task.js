// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateTask = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        start_time: joi.date().timestamp().required(),
        end_time: joi.date().timestamp().required(),
        priority: joi.number().required(),
        flag: joi.string(),
        user: joi.string(),
        messages: joi.string()
    });
    return joi.validate(value, schema)
}

// schema
const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        start_time: {
            type: Date,
            required: true
        },
        priority: {
            type: Number,
            required: true
        },
        end_time: {
            type: Date,
            required: true
        },
        flag: {
            type: String,
            enum: ["ongoing", "exceded", "completed"],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            default: []
        }]
    },
    {
        timestamps: true
    }
);

// task model
const Task = mongoose.model("task", taskSchema);

// exports
module.exports = { validateTask, Task }