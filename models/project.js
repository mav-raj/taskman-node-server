// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateProject = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        tasks: joi.array().items(joi.string())
    });
    return joi.validate(value, schema);
}

// schema 
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "task",
            required: true,
        }]
    },
    {
        timestamps: true
    }
);

// project model

const Project = mongoose.model("project", projectSchema);

// exports
module.exports = { validateProject, Project }