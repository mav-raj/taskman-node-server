// imports
const { validateUser, User } = require('../models/user');
const { generateToken } = require('../helpers/jwt');


// exports
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
        console.log("ERROR-WHILE-CREATING-USER: ", e.message);
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
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