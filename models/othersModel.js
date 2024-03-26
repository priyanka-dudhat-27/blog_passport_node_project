const mongoose=require('mongoose');

const othersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
});

const Others=mongoose.model('Others',othersSchema);
module.exports=Others;