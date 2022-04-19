require('dotenv').config()
const mongoose = require("mongoose");
  mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
 }).then(()=>{
     console.log("connectin Successful");
 }).catch((e)=>{
     console.log(e);
 });