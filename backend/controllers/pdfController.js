const fs = require("fs");
const pdfParse = require('pdf-parse');
const {generateInterviewQuestions} = require('../utils/geminiAPI');

exports.handlePDFUpload = async(req, res)=>{
    try
    {
        const filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const content = pdfData.text;

        console.log("PDF CONTENT: ", content);

        const questions = await generateInterviewQuestions(content);

        fs.unlinkSync(filePath);
        res.json(questions);
    }
    catch(err)
    {
        console.error("PDF upload error: ", err);
        res.status(500).json({error: `Faild to process PDF: ${err}`});
    }
}