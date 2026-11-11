
const { Router } = require("express");
const authController = require("../controllers/auth.controllers");
const { authUser } = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @description Register a new user
 * @access  Public
 *
 * Registration flow:
 * 1. Receive user details (name, email, password)
 * 2. Validate the request data
 * 3. Check whether the user already exists
 * 4. Hash the password using bcrypt
 * 5. Save the user in MongoDB
 * 6. Return a success response
 */
authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/logout", authController.logoutUserController);
authRouter.get("/me", authUser, authController.getMeController);

// Export the authentication router
module.exports = authRouter;
