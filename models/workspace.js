// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');

// joi validation
const validateWorkspace = value => {
    const schema = joi.object().keys({
        name: joi.string().required(),
        description: joi.string()
    });
    return schema.validate(value);
}

// schema 
const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

// project model

const Workspace = mongoose.model("workspace", workspaceSchema);

// exports
module.exports = { validateWorkspace, Workspace }