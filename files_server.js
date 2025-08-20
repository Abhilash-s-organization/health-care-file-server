const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const destination_filename = Date.now() +"_"+Math.round(Math.random() * 1E9)+'_'+file.originalname;
    cb(null, destination_filename);
  }
})

const upload = multer({ storage: storage });
//const upload = multer({dest:'uploads/'});

const app = express();

app.post('/api/upload',upload.array('file',12),(req,res)=>{
     if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }
    res.json(req.files);
})


const port = process.env.PORT || 3000;
app.listen(3000 , ()=>{
    console.log(`Listening on port ${port}`);
});

module.exports = app;