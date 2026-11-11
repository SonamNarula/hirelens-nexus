
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("HireLens API is running");
});

// Authentication routes
const authRouter = require("./routes/auth.routes");

app.use("/api/auth", authRouter);

module.exports = app;
