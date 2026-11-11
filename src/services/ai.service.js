const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");

function getClient() {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        const error = new Error("GOOGLE_GENAI_API_KEY is not configured");
        error.statusCode = 503;
        throw error;
    }
    return new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
}

const reportShape = {
    type: "object",
    properties: {
        title: { type: "string" },
        matchScore: { type: "number" },
        technicalQuestions: { type: "array", items: { type: "object", properties: {
            question: { type: "string" }, intention: { type: "string" }, answer: { type: "string" }
        }, required: ["question", "intention", "answer"] } },
        behavioralQuestions: { type: "array", items: { type: "object", properties: {
            question: { type: "string" }, intention: { type: "string" }, answer: { type: "string" }
        }, required: ["question", "intention", "answer"] } },
        skillGaps: { type: "array", items: { type: "object", properties: {
            skill: { type: "string" }, severity: { type: "string", enum: ["low", "medium", "high"] }
        }, required: ["skill", "severity"] } },
        preparationPlan: { type: "array", items: { type: "object", properties: {
            day: { type: "number" }, focus: { type: "string" }, tasks: { type: "array", items: { type: "string" } }
        }, required: ["day", "focus", "tasks"] } }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are a senior technical interview mentor. Analyze the candidate context below for the target role.
Return only valid JSON matching the provided schema. Do not invent candidate experience; clearly identify gaps.

RESUME:
${resume || "Not provided"}

SELF DESCRIPTION:
${selfDescription || "Not provided"}

JOB DESCRIPTION:
${jobDescription}`;

    const response = await getClient().models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: reportShape,
            temperature: 0.2
        }
    });

    try {
        const report = JSON.parse(response.text);
        report.matchScore = Math.max(0, Math.min(100, Number(report.matchScore)));
        return report;
    } catch (error) {
        const parseError = new Error("AI returned an invalid interview report");
        parseError.statusCode = 502;
        throw parseError;
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const response = await getClient().models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
        contents: `Create a concise, ATS-friendly HTML resume for this candidate and target role.
Return only a JSON object with one "html" string property. Escape content safely and do not include scripts.

RESUME:
${resume || "Not provided"}

SELF DESCRIPTION:
${selfDescription || "Not provided"}

JOB DESCRIPTION:
${jobDescription}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: { html: { type: "string" } },
                required: ["html"]
            },
            temperature: 0.2
        }
    });

    let html;
    try {
        html = JSON.parse(response.text).html;
    } catch (error) {
        const parseError = new Error("AI returned an invalid resume document");
        parseError.statusCode = 502;
        throw parseError;
    }

    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        return await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "16mm", right: "14mm", bottom: "16mm", left: "14mm" }
        });
    } finally {
        await browser.close();
    }
}

module.exports = { generateInterviewReport, generateResumePdf };
