const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const sliderPath='/uploads/sliders'
const sliderSchema=mongoose.Schema({
    slidertitle:{
        type:String,
        required:true,
    },
    sliderlink:{
        type:String,
        required:true,
    },
    sliderdescription:{
        type:String,
        required:true,
    },
    sliderimage:{
        type:String,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',sliderPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});
sliderSchema.statics.sliderUploads=multer({storage:storage}).single('sliderimage');
sliderSchema.statics.sliderIpath=sliderPath;
const Slider=mongoose.model('Slider',sliderSchema);
module.exports=Slider;