const sliderModel=require('../models/sliderModel')
const fs=require('fs')
const path=require('path')

module.exports.add_slider=async(req,res)=>{
    return res.render('add_slider')
}

module.exports.insertSliderData=async(req,res)=>{

    console.log(req.body)
    console.log(req.file)
    try{
        var img='';
        if(req.file){
            img=sliderModel.sliderIpath+'/'+req.file.filename;
        }
        req.body.sliderimage=img;
        let adddata=await sliderModel.create(req.body);
        if(adddata){
            req.flash('success','slider data added successfully')
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

module.exports.view_slider=async(req,res)=>{
    try{
        var search='';
        if(req.query.search){
            search=req.query.search
        }
        console.log(req.query.seach)
        let sliderData=await sliderModel.find({
            $or:[
                {slidertitle:{$regex:search,$options:"i"}},
                {sliderdescription:{$regex:search,$options:"i"}},
            ]   
        });
        if(sliderData){
            return res.render('view_slider',{
                sliderData:sliderData,
                search:search
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

module.exports.delete_slider=async(req,res)=>{
    try{
            let single=await sliderModel.findById(req.params.id);
        if(single){
            let imagePath=path.join(__dirname,'..',single.sliderimage);
            await fs.unlinkSync(imagePath);
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await sliderModel.findByIdAndDelete(req.params.id);
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

module.exports.edit_slider=async(req,res)=>{
    let singleData=await sliderModel.findById(req.query.id);
   res.render('edit_slider',{
    singleData:singleData,
    userData:req.user

   });
}

module.exports.edit_sliderData=async(req,res)=>{
    if(req.file){
        let singleData=await sliderModel.findById(req.params.id);
        if(singleData && singleData.sliderimage){
            let imagePath=path.join(__dirname,'..',singleData.sliderimage);
            await fs.unlinkSync(imagePath);
        }
        var img='';
        req.body.sliderimage=sliderModel.sliderIpath+'/'+req.file.filename;
    }
    else{
        let singleData=await sliderModel.findById(req.params.id);
        if(singleData){
            req.body.sliderimage=singleData.image;
        }
    }
    await sliderModel.findByIdAndUpdate(req.params.id,req.body);
    return res.redirect('/admin/slider/view_slider');
}

module.exports.deleteMultipleRecords=async(req,res)=>{
    try{
        let deleteMultiple=await sliderModel.deleteMany({_id:{$in:req.body.sliderIds}});
    if(deleteMultiple){
        req.flash('success','multiple record deleted')
        return res.redirect('back')
    }else{
        req.flash('error','something wrong')
        return res.redirect('back')
    }
    }catch(err){
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}