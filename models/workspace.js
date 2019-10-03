// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateWorkspace = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        projects: joi.array().items(joi.string())
    });
    return joi.validate(value, schema);
}

// schema 
const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            required: true,
        }]
    },
    {
        timestamps: true
    }
);

// project model

const Workspace = mongoose.model("workspace", workspaceSchema);

// exports
module.exports = { validateWorkspace, Workspace }