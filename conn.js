const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/pizza",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
 }).then(()=>{
     console.log("connectin Successful");
 }).catch((e)=>{
     console.log(e);
 });