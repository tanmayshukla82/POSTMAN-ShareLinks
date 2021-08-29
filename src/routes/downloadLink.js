const Router = require('express');
const router = new Router();
const File = require('../models/file');
router.get('/files/download/:uuid',async(req,res)=>{
    try {
        const file = await File.findOne({uuid : req.params.uuid});
        if(!file)
        {
            return res.render('downloadLink',{error : 'file not found.'});
        }
        const filePath = `${file.path}`;
        console.log(filePath);
        res.download(filePath);

    } catch (error) {
        return res.status(404).send({error : 'error'});
    }
});




module.exports = router;