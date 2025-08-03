const express = require('express');
const cors = require('cors');
const pdfRoutes = require('../routes/pdfRoute'); // Adjusted path

const app = express();

app.use(cors());
app.use(express.json()); // Add this line
app.use('/api/pdf', pdfRoutes);

app.use('/', (req, res) => {
  res.send("Server is ready");
});

module.exports = app;
