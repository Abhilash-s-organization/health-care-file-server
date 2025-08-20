const express = require('express');
const uploadroutes = require('./routes/routes');

const app = express();

app.use('/api/upload', uploadroutes);

module.exports = app;