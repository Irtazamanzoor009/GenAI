const axios = require('axios');
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateInterviewQuestions = async (pdfText) => {
    try {
        const prompt = `
        You are an AI interviewer. Based on the provided content, generate interview-style questions and answers that test understanding of the topic.

        Requirements:
        - 5 Basic (fundamental concepts)
        - 5 Medium (intermediate, practical applications)
        - 5 Advanced (deep understanding, complex scenarios)
        - Write answers in simple, easy-to-understand language.
        - Keep questions and answers relevant only to the provided content.
        - Avoid repeating similar questions.

        Content:
        ${pdfText}

        Return the response strictly in the following JSON format:
        {
        "basic": [
            { "question": "Question text", "answer": "Answer text" }
        ],
        "medium": [
            { "question": "Question text", "answer": "Answer text" }
        ],
        "advanced": [
            { "question": "Question text", "answer": "Answer text" }
        ]
        }
        `;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        const cleanedText = response
            .replace(/^```json\s*/, '') 
            .replace(/^```\s*$/, '') 
            .replace(/```$/, '') 
            .trim();

        const parsedJSON = JSON.parse(cleanedText);
        return parsedJSON;
    }
    catch (err) {
        console.error("Failed to generate questions: ", err);
        throw new Error("Failed to generate questions from Gemini API");
    }
}