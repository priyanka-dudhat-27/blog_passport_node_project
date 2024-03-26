const photosModel=require('../models/photosModel')
const path=require('path');
const fs=require('fs')

module.exports.add_photos=async(req,res)=>{
    return res.render('add_photos')
}

module.exports.insertPhotosData=async(req,res)=>{

    console.log(req.body)
    console.log(req.file)
    try{
        var img='';
        if(req.file){
            img=photosModel.photosIpath+'/'+req.file.filename;
        }
        req.body.photosimage=img;
        let adddata=await photosModel.create(req.body);
        if(adddata){
            req.flash('success','photos data added successfully')
            return res.redirect('back')
        }
        else{
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','something wrong !')
        return res.redirect('back')
    }
}
module.exports.view_photos=async(req,res)=>{
    try{
        let singleData=await photosModel.find();
        if(singleData){
            return res.render('view_photos',{
                singleData:singleData
            });
        }else{
            req.flash('error','something wrong !')
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error','something wrong !')
        return res.redirect('back')
    }
}
module.exports.delete_photos=async(req,res)=>{
    try{
            let single=await photosModel.findById(req.params.id);
        if(single){
            let imagePath=path.join(__dirname,'..',single.photosimage);
            await fs.unlinkSync(imagePath);
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await photosModel.findByIdAndDelete(req.params.id);
        if(del){
            console.log(del);
            req.flash('success','Record deleted successfully')
            return  res.redirect('back');
        }
        else{
            req.flash('error','record not deleted from db')
            console.log('something wrong!');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error','Record not found')
        return res.redirect('back');
    }
}
module.exports.edit_photos=async(req,res)=>{
    try{
        let singleData=await photosModel.findById(req.query.id);
        if(singleData){
            return res.render('edit_photos',{
                singleData:singleData
            });
        }
        else{
            req.flash('error','Record not found')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error','Record not found')
        return res.redirect('back');
    }
}

module.exports.editPhotosData=async(req,res)=>{
    try{
        if(req.file){
            let findData=await photosModel.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.photosimage);
                await fs.unlinkSync(imagePath);
            }
            var img='';
            req.body.photosimage=photosModel.photosIpath+'/'+req.file.filename;
        }
        else{
            let findData=await photosModel.findById(req.params.id);
            if(findData){
                req.body.photosimage=findData.image;
            }
        }
        let update=await photosModel.findByIdAndUpdate(req.params.id,req.body);
        if(update){
            req.flash('success','Record updated successfully')
            return res.redirect('/admin/photos/view_photos');
        }else{
            req.flash('error','Something wrong')

            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
}