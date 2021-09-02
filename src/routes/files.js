const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
    destination : (req,res,cb)=>cb(null,'uploads/'),
    filename : (req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limit:{fileSize: 1000000*100}
}).single('myFile');

router.post('/api/files',(req,res)=>{
   
    // 2>store File
        upload(req,res,async(err)=>{
             // 1>Validate Request
        if(!req.file)
        {
            return res.send({error : 'No file found'});
        }
            if(err)
            {
                //'Error in uploading'
                return res.send({error :err });
            }
              // 3>store in the database
              const uploadFile = new File({
                  filename : req.file.filename,
                  uuid : uuidv4(),
                  path : req.file.path,
                  size : req.file.size
              });

              const response = await uploadFile.save();
              
             return res.send({file : `${process.env.APP_BASE_URL}files/${response.uuid}`});
        })
  
    // 4>response
    
})


module.exports = router;
