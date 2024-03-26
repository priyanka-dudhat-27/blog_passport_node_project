const mongoose=require('mongoose');

const offersSchema=mongoose.Schema({
    icon:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    }
});

const Offers=mongoose.model('Offers',offersSchema);
module.exports=Offers;