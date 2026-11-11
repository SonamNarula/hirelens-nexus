
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// Health check route
app.get("/", (req, res) => {
    res.send("HireLens API is running");
});

// Authentication routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.use((error, req, res, next) => {
    console.error("Unhandled request error:", error);
    if (res.headersSent) return next(error);
    return res.status(error.statusCode || 500).json({
        message: error.statusCode ? error.message : "Internal server error"
    });
});

module.exports = app;
