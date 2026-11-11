const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const controller = require("../controllers/interview.controllers");

const interviewRouter = express.Router();

interviewRouter.post("/", authUser, upload.single("resume"), controller.generateInterviewReportController);
interviewRouter.get("/", authUser, controller.getAllInterviewReportsController);
interviewRouter.get("/report/:interviewId", authUser, controller.getInterviewReportByIdController);
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, controller.generateResumePdfController);

module.exports = interviewRouter;
