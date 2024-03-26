const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const photosPath='/uploads/photos'
const photosSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    photosimage:{
        type:String,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',photosPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});
photosSchema.statics.photosUploads=multer({storage:storage}).single('photosimage');
photosSchema.statics.photosIpath=photosPath;
const Photos=mongoose.model('Photos',photosSchema);
module.exports=Photos;