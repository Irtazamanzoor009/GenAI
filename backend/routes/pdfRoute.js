const express = require("express");
const multer = require("multer");
const router = express.Router();
const pdfController = require('../controllers/pdfController');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('pdf'), pdfController.handlePDFUpload);

module.exports = router;