const File = require('../models/file');
const fs = require('fs');
const connectDB = require('../config/db');
connectDB();
async function deleteData(){
    const pastDate = new Date(Date.now() - 1000*60*60*24);
    const file = await File.find({createdAt : {$lt: pastDate}});
    if(file.length)
    {
       try {
        for(const f of file){
            fs.unlinkSync(f.path);
            await  f.remove();
            console.log(`successfully deleted ${f.filename}`);
        }
       } catch (error) {
        console.log(`Error while deleting file ${error}`);
       }
    }
    console.log('job done');
}

deleteData().then(process.exit);