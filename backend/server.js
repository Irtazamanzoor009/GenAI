const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoute');

const app = express();
app.use(cors());

// Routes
app.use('/api/pdf', pdfRoutes);

app.use('/', (req, res)=>{
    res.send("Server is ready");
})

const port = 5000;
app.listen(port, ()=> console.log(`Server running http://localhost:${port}`));