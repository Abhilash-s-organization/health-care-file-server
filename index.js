const express = require('express');
const uploadroutes = require('./routes/routes');

//const upload = multer({dest:'uploads/'});

const app = express();

app.use('/api/upload', uploadroutes)

//(req,res)=>{
//     if (!req.files || req.files.length === 0) {
//    return res.status(400).json({ error: 'No files were uploaded' });
//  }
//    res.json(req.files);
//}



const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`Listening on port ${port}`);
});

module.exports = app;