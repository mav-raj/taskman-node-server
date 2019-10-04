// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

//constants-import
const TASK_INTERVAL = require('../assets/constants').TASK_DEFAULT_INTERVAL;

// joi validation
const validateTask = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        start_time: joi.string(),
        end_time: joi.string(),
        priority: joi.number().required(),
        flag: joi.string(),
        user_assigned: joi.string(),
        project: joi.string().required(),
    });
    return schema.validate(value)
}
// for setting default end_time for a task if not provided
let currTime = new Date();
let currTimeString = currTime.toLocaleString();

let tenDaysAhead = new Date(currTime.setTime(currTime.getTime() + TASK_INTERVAL * 86400000));
let daysAheadString = tenDaysAhead.toLocaleString();
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
            required: true,
            default: currTimeString
        },
        end_time: {
            type: Date,
            required: true,
            default: daysAheadString
        },
        priority: {
            type: Number,
            required: true
        },
        flag: {
            type: String,
            enum: ["yet to start", "ongoing", "exceded", "completed"],
            default: "yet to start"
        },
        user_assigned: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            required: true
        },

    },
    {
        timestamps: true
    }
);

// task model
const Task = mongoose.model("task", taskSchema);

// exports
module.exports = { validateTask, Task }