const Router = require('express');
const router = new Router();
const File = require('../models/file');
const sendMail = require('../services/emailService');

router.post('/api/file/send',async(req,res)=>{
    try {
        const json = req.body;
        if(!json.uuid||!json.fromEmail || !json.toEmail)
        {
            return res.status(422).send({error : 'All Fields are required'});
        }
        const file = await File.findOne({uuid : json.uuid});
        if(file.sender)
        {
            return res.status(422).send('Email alredy sent');
        }
        file.sender = json.fromEmail;
        file.receiver = json.toEmail;
        const response = await file.save();
        sendMail({
            from : json.fromEmail,
            to : json.toEmail,
            subject : 'POSTMAN-ShareLinks',
            text : `${json.fromEmail} shared a file with you.`,
            html : require('../services/emailTemplate')({
                emailFrom : json.fromEmail,
                downloadLink : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
                size : parseInt(file.size/1000) + ' KB',
                expires : '24 Hours'
            })
        });
        return res.send('Email sent successfully.')
    } catch (err) {
        res.send({error : "Something Went wrong."})
    }
       
});


module.exports = router;