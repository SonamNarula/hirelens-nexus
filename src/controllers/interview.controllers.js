const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");

async function extractResumeText(file) {
    if (!file) return "";
    const result = await pdfParse(file.buffer);
    return result.text.trim();
}

async function generateInterviewReportController(req, res) {
    const { jobDescription, selfDescription } = req.body;
    if (!jobDescription?.trim()) {
        return res.status(400).json({ message: "Job description is required" });
    }
    if (!req.file && !selfDescription?.trim()) {
        return res.status(400).json({ message: "Upload a PDF resume or provide a self description" });
    }

    const resume = await extractResumeText(req.file);
    const report = await generateInterviewReport({
        resume,
        selfDescription: selfDescription?.trim(),
        jobDescription: jobDescription.trim()
    });

    const savedReport = await interviewReportModel.create({
        user: req.user.id,
        resume,
        selfDescription: selfDescription?.trim(),
        jobDescription: jobDescription.trim(),
        ...report
    });

    return res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport: savedReport
    });
}

async function getInterviewReportByIdController(req, res) {
    const report = await interviewReportModel.findOne({
        _id: req.params.interviewId,
        user: req.user.id
    });
    if (!report) return res.status(404).json({ message: "Interview report not found" });
    return res.status(200).json({ interviewReport: report });
}

async function getAllInterviewReportsController(req, res) {
    const reports = await interviewReportModel.find({ user: req.user.id })
        .select("-resume -selfDescription -jobDescription")
        .sort({ createdAt: -1 });
    return res.status(200).json({ interviewReports: reports });
}

async function generateResumePdfController(req, res) {
    const report = await interviewReportModel.findOne({
        _id: req.params.interviewReportId,
        user: req.user.id
    });
    if (!report) return res.status(404).json({ message: "Interview report not found" });

    const pdf = await generateResumePdf({
        resume: report.resume,
        selfDescription: report.selfDescription,
        jobDescription: report.jobDescription
    });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="hirelens-resume-${report._id}.pdf"`
    });
    return res.send(pdf);
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};
