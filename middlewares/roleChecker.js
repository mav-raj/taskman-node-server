// string constants - DO NOT CHANGE!!
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';

// exports
exports.checkRole = role => (req, res, next) => {

    if (role === ROLE_ADMIN) {
        // check requested for admin
        if (req.role === ROLE_ADMIN) return next();

    }

    if (role === ROLE_USER) {
        // check requested for user
        if (req.role === ROLE_USER) return next();
    }

    return res.status(401).json({ message: 'Access Denied' });

}
exports.ROLE_USER = ROLE_USER;
exports.ROLE_ADMIN = ROLE_ADMIN;