// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateProject = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        workspace: joi.string().required()
    });
    return schema.validate(value);
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
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "workspace",
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// project model

const Project = mongoose.model("project", projectSchema);

// exports
module.exports = { validateProject, Project }