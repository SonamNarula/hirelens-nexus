const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

function publicUser(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

function setAuthCookie(res, user) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
        { id: user._id.toString(), username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    });
}

async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: "Username, email and password are required" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await userModel.findOne({
            $or: [{ username: username.trim() }, { email: normalizedEmail }]
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Account already exists with this email address or username"
            });
        }

        const user = await userModel.create({
            username: username.trim(),
            email: normalizedEmail,
            password: await bcrypt.hash(password, 12)
        });
        setAuthCookie(res, user);
        return res.status(201).json({
            message: "User registered successfully",
            user: publicUser(user)
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Unable to register user" });
    }
}

async function loginUserController(req, res) {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        setAuthCookie(res, user);
        return res.status(200).json({
            message: "User logged in successfully",
            user: publicUser(user)
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Unable to log in" });
    }
}

function logoutUserController(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({ message: "User logged out successfully" });
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id).select("_id username email");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({
        message: "User details fetched successfully",
        user: publicUser(user)
    });
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};
