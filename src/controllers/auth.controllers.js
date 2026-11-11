
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
    // Registration logic will be implemented here
    const{username, email, password} = req.body

    if(!username || !email ||!password){
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"accoung already exists with this email address or username!!"
        })
    }
}

// Export the controller for use in authentication routes
module.exports = {
    registerUserController
};
