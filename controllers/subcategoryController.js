const categoryModel=require('../models/categoryModel')
const subcategoryModel=require('../models/subcategoryModel')
const moment=require('moment')

module.exports.add_subcategory=async(req,res)=>{
try {
    let catData=await categoryModel.find();
    console.log(catData);
    return res.render('add_subcategory',{
        catData:catData
    })
} catch (err) {
    console.log(err);
    return res.redirect('back')
}}

module.exports.insert_subcategoryData=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        var img='';
        if(req.file){
            img=subcategoryModel.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;
        req.body.status=true;
        req.body.created_date=moment().format('LLL');
        let subcatData=await subcategoryModel.create(req.body);
        if(subcatData){
            console.log('subcategory Record inserted');
            return res.redirect('back');
        }
        else{
            console.log('something is wrong!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
    
}