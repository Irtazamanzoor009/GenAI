const fs = require("fs");
const pdfParse = require('pdf-parse');
const {generateInterviewQuestions} = require('../utils/geminiAPI');

exports.handlePDFUpload = async(req, res)=>{
    try
    {
        const dataBuffer = req.file.buffer;
        const pdfData = await pdfParse(dataBuffer);
        const content = pdfData.text;

        console.log("PDF CONTENT: ", content);

        const questions = await generateInterviewQuestions(content);
        res.json(questions);
    }
    catch(err)
    {
        console.error("PDF upload error: ", err);
        res.status(500).json({error: `Faild to process PDF: ${err}`});
    }
}