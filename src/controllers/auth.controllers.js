const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

/**
 * @function registerUserController
 * @description Handles the registration of a new user
 *
 * Registration workflow:
 * 1. Extract user details from the request body
 * 2. Validate the required fields
 * 3. Check whether the user already exists
 * 4. Hash the password securely using bcrypt
 * 5. Create a new user in MongoDB
 * 6. Return the registered user's details
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        });
    }

    try {
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "Account already exists with this email address or username"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Export the controller for use in authentication routes
module.exports = {
    registerUserController
};
