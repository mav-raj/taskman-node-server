// imports
const express = require('express');
const router = express.Router();

// middlewares
const _roleChecker = require('../middlewares/roleChecker');
const _verifyToken = require('../middlewares/verifyToken').verifyUserToken;
const _verifyUser = require('../middlewares/validateUser').validateUser;

// controllers
const adminControllers = require('../controllers/adminControllers');
const userControllers = require('../controllers/userControllers');

// admin-routes

// POST - methods
router // create-user
    .route('/user')
    .post(
        _verifyToken,
        adminControllers.createUser
    );

router // login-admin
    .route('/login')
    .post(
        _verifyUser,
        adminControllers.adminLogin
    )

// exports
module.exports = router;