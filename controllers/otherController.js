const othersModel=require('../models/othersModel')
const path=require('path')
const fs=require('fs')

module.exports.add_others=async(req,res)=>{
    return res.render('add_others')
}

module.exports.insertOthersData=async(req,res)=>{

    console.log(req.body)
    try{
        let adddata=await othersModel.create(req.body);
        if(adddata){
            req.flash('success','others data added successfully')
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
module.exports.view_others=async(req,res)=>{
    try{
        let singleData=await othersModel.find();
        if(singleData){
            return res.render('view_others',{
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
module.exports.delete_others=async(req,res)=>{
    try{
            let single=await othersModel.findById(req.params.id);
        if(single){
           if(single.othersimage){
            let imagePath=path.join(__dirname,'..',single.othersimage);
            await fs.unlinkSync(imagePath);
           }
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await othersModel.findByIdAndDelete(req.params.id);
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

module.exports.edit_others=async(req,res)=>{
    try{
        let singleData=await othersModel.findById(req.query.id);
        if(singleData){
            return res.render('edit_others',{
                singleData:singleData
            });
        }else{
            req.flash('error','something wrong!')
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error','something wrong!')
        return res.redirect('back')
    }
}
module.exports.editOthersData=async(req,res)=>{
    try{
        let singleData=await othersModel.findById(req.params.id);
        if(singleData){
            let update=await othersModel.findByIdAndUpdate(req.params.id,req.body);
            if(update){
                req.flash('success','Record updated successfully')
                return res.redirect('/admin/others/view_others');
            }
            else{
                req.flash('error','something wrong!')
                return res.redirect('back')
            }
        }
        else{
            req.flash('error','something wrong!')
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error','something wrong!')
        return res.redirect('back')
    }
}