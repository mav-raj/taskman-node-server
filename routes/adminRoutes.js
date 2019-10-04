// imports
const express = require('express');
const router = express.Router();

// middlewares
const _verifyToken = require('../middlewares/verifyToken').verifyUserToken;
const _verifyUser = require('../middlewares/validateUser').validateUser;

// controllers
const adminControllers = require('../controllers/adminControllers');


// admin-routes

// POST - methods
router // login-admin
    .route('/login')
    .post(
        _verifyUser,
        adminControllers.adminLogin
    );

router // create-user
    .route('/user')
    .post(
        _verifyToken,
        adminControllers.createUser
    );

router // create-Task
    .route('/task')
    .post(
        _verifyToken,
        adminControllers.createTask
    )

router // create-project
    .route('/project')
    .post(
        _verifyToken,
        adminControllers.createProject
    )

router // create-team
    .route('/team')
    .post(
        _verifyToken,
        adminControllers.createTeam
    )

router // create-message
    .route('/message')
    .post(
        _verifyToken,
        adminControllers.createMessage
    )

router // create-workspace
    .route('/workspace')
    .post(
        _verifyToken,
        adminControllers.createWorkspace
    )


// GET - methods

// PLURAL
router // get-all-users
    .route('/user')
    .get(
        _verifyToken,
        adminControllers.getAllUser
    )

router // get-all-tasks
    .route('/task')
    .get(
        _verifyToken,
        adminControllers.getAllTasks
    )

router // get-all-projects
    .route('/project')
    .get(
        _verifyToken,
        adminControllers.getAllProjects
    )

router // get-all-teams
    .route('/team')
    .get(
        _verifyToken,
        adminControllers.getAllTeams
    )

router // get-all-workspaces
    .route('/workspace')
    .get(
        _verifyToken,
        adminControllers.getAllWorkspaces
    )

router // get-all-message
    .route('/message')
    .get(
        _verifyToken,
        adminControllers.getAllMessages
    )




// SINGULAR
router // get-user-by-ID
    .route('/user/:id')
    .get(
        _verifyToken,
        adminControllers.getUserById
    )

router // get-task-by-ID
    .route('/task/:id')
    .get(
        _verifyToken,
        adminControllers.getTaskById
    )

router // get-project-by-ID
    .route('/project/:id')
    .get(
        _verifyToken,
        adminControllers.getProjectById
    )

router // get-team-by-ID
    .route('/team/:id')
    .get(
        _verifyToken,
        adminControllers.getTeamById
    )

router // get-workspace-by-ID
    .route('/workspace/:id')
    .get(
        _verifyToken,
        adminControllers.getWorkspaceById
    )

router // get-message-by-ID
    .route('/message/:id')
    .get(
        _verifyToken,
        adminControllers.getMessageById
    )


// exports
module.exports = router;