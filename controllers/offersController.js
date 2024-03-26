const offersModel=require('../models/offersModel')
const path=require('path')
const fs=require('fs')

module.exports.add_offers=async(req,res)=>{
    return res.render('add_offers')
}

module.exports.insertOffersData=async(req,res)=>{

    console.log(req.body)
    try{
        let singleData=await offersModel.create(req.body);
        if(singleData){
            req.flash('success','others data added successfully')
            return res.redirect('back')
        }
        else{
            req.flash('error','Something is wrong !');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',' wrong !')
        return res.redirect('back')
    }
}

module.exports.view_offers=async(req,res)=>{
    try{
        var search='';
        if(req.query.search){
            search=req.query.search
        }
        console.log(req.query.search)

        let singleData=await offersModel.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},
            ] 
        });
        if(singleData){
            return res.render('view_offers',{
                singleData:singleData,
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
module.exports.delete_offers=async(req,res)=>{
    try{
            let single=await offersModel.findById(req.params.id);
        if(single){
            if(single.offersimage){
                let imagePath=path.join(__dirname,'..',single.offersimage);
                await fs.unlinkSync(imagePath);
            }
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await offersModel.findByIdAndDelete(req.params.id);
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

module.exports.edit_offers=async(req,res)=>{
    let singleData=await offersModel.findById(req.query.id);
    
   res.render('edit_offers',{
    singleData:singleData,
    userData:req.user

   });
}

module.exports.editOffersData=async(req,res)=>{
    try{
        if(req.file){
            let findData=await offersModel.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            var img='';
            req.body.image=offersModel.iPath+'/'+req.file.filename;
        }
        else{
            let findData=await offersModel.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
                req.body.name=req.body.fname+' '+req.body.lname;
            }
        }
        await offersModel.findByIdAndUpdate(req.params.id,req.body);
        return res.redirect('/admin/offers/view_offers');
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

