// imports
const { generateToken } = require('../helpers/jwt');
// models-import
const { validateUser, User } = require('../models/user');
const { validateTask, Task } = require('../models/task');
const { validateProject, Project } = require('../models/project');
const { validateTeam, Team } = require('../models/team');
const { validateMessage, Message } = require('../models/message');
const { validateEvent, Event } = require('../models/event');
const { validateWorkspace, Workspace } = require('../models/workspace');


// exports

// POST - CONTROLLERS----------------------------------------------------------------------------

exports.adminLogin = async (req, res) => {
    try {
        const user = req.body;
        // generate new token
        const token = generateToken(user);

        // updating last login field
        req.body.lastLogin = Date.now();
        await User.findByIdAndUpdate(req.id, req.body, { new: true });

        res.status(200).json({
            token,
            user: {
                role: user.role,
                name: user.name,
                email: user.email,
            }
        });
    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-LOGIN-ADMIN: ", e.message);
    }
}

exports.createUser = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { role, name, email, password, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }
        // for joi validation of actual body sent for the user creation request
        const actualBody = { role, name, email, password }

        const { error } = validateUser(actualBody);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // checking for existing email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email is already registered' });
        }
        const newUser = new User({
            role,
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({
            role,
            name,
            email
        });
    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-USER: ", e);
    }
}

exports.createTask = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { name, description, start_time, end_time, priority, user_assigned, project, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        // for joi validation of actual body sent for the user creation request
        const actualBody = { name, description, start_time, end_time, priority, user_assigned, project }
        const { error } = validateTask(actualBody);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newTask = new Task({
            name,
            description,
            start_time,
            end_time,
            priority,
            user_assigned,
            project,
        });

        await newTask.save();
        res.status(201).json({
            name,
            description,
            start_time,
            end_time,
            priority,
            user_assigned,
            project,
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-TASK: ", e);
    }
}

exports.createProject = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { name, description, workspace, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        // for joi validation of actual body sent for the user creation request
        const actualBody = { name, description, workspace }
        const { error } = validateProject(actualBody);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newProject = new Project({
            name,
            description,
            workspace
        });

        await newProject.save();
        res.status(201).json({
            name,
            description,
            workspace
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-PROJECT: ", e);
    }
}

exports.createTeam = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { name, description, users, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        // for joi validation of actual body sent for the user creation request
        const actualBody = { name, description, users }
        const { error } = validateTeam(actualBody);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newTeam = new Team({
            name,
            description,
            users
        });

        await newTeam.save();

        res.status(201).json({
            name,
            description,
            users
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-TEAM: ", e);
    }
}

exports.createWorkspace = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { name, description, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        // for joi validation of actual body sent for the user creation request
        const actualBody = { name, description }
        const { error } = validateWorkspace(actualBody);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newWorkspace = new Workspace({
            name,
            description
        });

        await newWorkspace.save();

        res.status(201).json({
            name,
            description
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-WORKSPACE: ", e);
    }
}

exports.createMessage = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { message, task, requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }
        // required fields for creating message that are handled here
        const created_by = requestFrom.id; // REQUIRED FIELDS
        const created_at = new Date().toLocaleString(); // REQUIRED FIELDS

        // for joi validation of actual body sent for the user creation request
        const actualBody = { message, task, created_by, created_at }
        const { error } = validateMessage(actualBody);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newMessage = new Message({
            message,
            task,
            created_by,
            created_at,
        });

        await newMessage.save();

        res.status(201).json({
            message,
            task,
            created_by,
            created_at,
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-CREATING-MESSAGE: ", e);
    }
}


// GET - CONTROLLERS-----------------------------------------------------------------------------

// PLURAL----------------------------------------------------------
exports.getAllUser = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        let users = await User.find();
        // filtering users from users & admins
        users = users.filter(user => user.role === 'user');
        res.send(users);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-USERS: ", e);
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const tasks = await Task.find();
        res.send(tasks);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-TASKS: ", e);
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const projects = await Project.find();
        res.send(projects);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-PROJECTs: ", e);
    }
}

exports.getAllTeams = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const teams = await Team.find();
        res.send(teams);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-TEAMS: ", e);
    }
}

exports.getAllWorkspaces = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const workspaces = await Workspace.find();
        res.send(workspaces);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-WORKSPACES: ", e);
    }
}

exports.getAllMessages = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const messages = await Message.find();
        res.send(messages);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-ALL-MESSAGE: ", e);
    }
}

// SINGULAR ---------------------------------------------------------

exports.getUserById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const user = await User.findById(id);
        res.send(user);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-USER-BY-ID: ", e);
    }
}

exports.getTaskById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const task = await Task.findById(id).populate('project');
        res.send(task);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-TASK-BY-ID: ", e);
    }
}

exports.getProjectById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const project = await Project.findById(id).populate('workspace');
        res.send(project);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-PROJECT-BY-ID: ", e);
    }
}

exports.getTeamById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const team = await Team.findById(id);
        res.send(team);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-TEAM-BY-ID: ", e);
    }
}

exports.getWorkspaceById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const workspace = await Workspace.findById(id);
        res.send(workspace);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-WORKSPACE-BY-ID: ", e);
    }
}

exports.getMessageById = async (req, res) => {
    try {
        // come here after token verification and also append a new obj "requestFrom" which will be a user obj where the request is coming from.
        const { requestFrom } = req.body;

        // check if request is coming from admin
        if (requestFrom.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized for this request' })
        }

        const id = req.params.id;

        const message = await Message.findById(id);
        res.send(message);

    } catch (e) {
        res.status(500).json({ message: "Internal Server error." });
        console.log("ERROR-WHILE-GETTING-MESSAGE-BY-ID: ", e);
    }
}


// PUT - CONTROLLERS-----------------------------------------------------------------------------
