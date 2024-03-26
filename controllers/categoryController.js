const categoryModel=require('../models/categoryModel')
const moment = require('moment')

module.exports.add_category=async(req,res)=>{
    try {
        return res.render('add_category')
    } catch (err) {
        console.log(err);
        return res.redirect('back');    }
}

module.exports.insertcategoryData=async(req,res)=>{
    try {
        req.body.status=true;
        req.body.created_date=moment().format('LLL');
        let addData=await categoryModel.create(req.body);
        if(addData){
            req.flash('success','category data added successfully')
            return res.redirect('back')
        }else{
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.view_category=async(req,res)=>{
    try {
        let catRecord=await categoryModel.find();
        if(catRecord){
            return res.render('view_category',{
                catRecord:catRecord
            })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports.delete_category=async(req,res)=>{
    try{
        let del=await categoryModel.findByIdAndDelete(req.params.id);
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

module.exports.update_category=async(req,res)=>{
    try {
        let singleData=await categoryModel.findById(req.params.id);
    
        res.render('edit_category',{
         singleData:singleData,
         userData:req.user
     
        });
    } catch (err){
        console.log(err)
        return res.redirect('back');
    }
}
