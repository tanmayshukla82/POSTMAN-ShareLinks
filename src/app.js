const express = require('express');
const connectDB = require('./config/db.js');
const fileRouter = require('./routes/files');
const path = require('path');
const ejs = require('ejs');
const downloadPageRouter = require('./routes/downloadPage');
const downloadRouter = require('./routes/downloadLink');
const emailRouter = require('./routes/sendEmail');
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(fileRouter);
app.use(downloadPageRouter);
app.use(downloadRouter);
app.use(emailRouter);



app.listen(PORT,()=>{
    console.log('connection successful');
});