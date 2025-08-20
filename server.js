const app = require('./index');

const port = process.env.PORT || 3000;
app.listen(port , (err)=>{
  if(err){
    console.log("error",err.message);
    return;
  }
    console.log(`Listening on port ${port}`);
});