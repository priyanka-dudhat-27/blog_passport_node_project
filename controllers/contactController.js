const contactModel=require('../models/contactModel')
module.exports.view_contact=async(req,res)=>{
    try{
        let contactRecord=await contactModel.find();
        return res.render('view_contact',{
            contactRecord:contactRecord
        })
    } catch (err) {
        console.log(err);
        return res.redirect('back');    }
}
