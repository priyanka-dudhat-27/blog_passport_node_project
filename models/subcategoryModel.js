const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const imgPath='/uploads/category'
const subcategorySchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    status:{
        type:Boolean,
        required:true,
    },
    created_date:{
        type:String,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imgPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});
subcategorySchema.statics.uploadImage=multer({storage:storage}).single('image');
subcategorySchema.statics.iPath=imgPath;
const Subcategory=mongoose.model('Subcategory',subcategorySchema);
module.exports=Subcategory;