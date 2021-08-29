const mongoose = require('mongoose');
require('dotenv').config();
function connectDB(){
    mongoose.connect("mongodb+srv://POSTMAN:tanu2442000@cluster0.1qmtf.mongodb.net/FilesDB?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useFindAndModify:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    }).then(()=>{console.log("Database Connected.")})
    .catch((err)=>{console.log(err)});
  
};

module.exports = connectDB;