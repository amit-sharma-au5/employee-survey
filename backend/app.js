const express = require('express');
const app = new express();
const cors = require('cors')
//Using Express.json 
app.use(express.json());
app.use(cors());
app.use("/",require('./Routes/sendingData'))

module.exports = app;