const mongoose = require('mongoose');

const schema = mongoose.Schema;

const fileSchema = new schema({
    filename : {
        type: String,
        required : true,
    },
    path:{
        type:String,
        required : true
    },
    size:
    {
        type : Number,
        required : true
    },
    uuid:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:false
    },
    receiver:{
        type:String,
        required:false
    }
});

const File = new mongoose.model("File",fileSchema);

module.exports = File;