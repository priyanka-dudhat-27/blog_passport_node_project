const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const postPath='/uploads/posts'
const postSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    created_date:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    postsimage:{
        type:String,
        required:true,
    },
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',postPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});
postSchema.statics.postUploads=multer({storage:storage}).single('postsimage');
postSchema.statics.postIpath=postPath;
const Post=mongoose.model('Post',postSchema);
module.exports=Post;