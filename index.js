const express = require('express');
const uploadroutes = require('./routes/routes');


const app = express();

app.use('/api/upload', uploadroutes);



const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`Listening on port ${port}`);
});

module.exports = app;