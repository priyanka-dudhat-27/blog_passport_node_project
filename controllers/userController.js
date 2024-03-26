const sliderModel=require('../models/sliderModel')
const othersModel=require('../models/othersModel')
const photosModel=require('../models/photosModel')
const offersModel=require('../models/offersModel')
const blogModel=require('../models/postModel')
const postModel=require('../models/postModel')
const commentModel=require('../models/commentModel')
const contactModel=require('../models/contactModel')
const Admin=require('../models/adminModel')
const categoryModel=require('../models/categoryModel')
const subcategoryModel=require('../models/subcategoryModel')
const nodemailer=require('nodemailer');
const moment = require('moment')

module.exports.home=async(req,res)=>{
    try{
        let sliderData=await sliderModel.find();
        let othersData=await othersModel.find();
        let photosData=await photosModel.find();
        let offersData=await offersModel.find();
        let blogData=await blogModel.find();
        let postsData=await postModel.find();
        if(sliderData){
            console.log(sliderData);
            return res.render('userPanel/home',{
                sliderData:sliderData,
                othersData:othersData,
                photosData:photosData,
                offersData:offersData,
                blogDataData:blogData,
                postsData:postsData,
            })
        }
      
        else{
            req.flash('error','something wrong!')
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error','something wrong!');
        return res.redirect('back')
    }
}

module.exports.blog_single=async(req,res)=>{
    try{
        // sort
        let postsData=await postModel.find({}).sort({_id:-1}).limit(3);
        console.log(postsData)
         // comment logic start
         let commentData=await commentModel.find({postId:req.params.id});
        //  console.log(commentData)

         // comment logic end
        // next previous logic start
        let allIds=await postModel.find({}).select('_id');
        let current;

        allIds.map((v,i)=>{
            if(v._id==req.params.id){
                current=i;
            }
        })
        // next-previous logic end
       
        let singleData=await postModel.findById(req.params.id);
        if(singleData){
            return res.render('userpanel/blog_single',{
                singleData:singleData,
                allIds:allIds,
                pos:current,
                commentData:commentData,
                postsData:postsData
            })
        }
        else{
            console.log('error')
            req.flash('something wrong')
            return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error','something wrong!')
        return res.redirect('back')
    }
}

module.exports.addPostComment=async(req,res)=>{
    try{
        let img='';
        if(req.file){
            img=commentModel.iPath+'/'+req.file.filename;
        }
        req.body.commentImage=img;
        req.body.created_date=moment().format('LLL');
        let addData=await commentModel.create(req.body);
        if(addData){
            req.flash('success','Comments Added !');
            return res.redirect('back');
        }
        else{
            req.flash('error','Error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// about page
module.exports.about=async(req,res)=>{
    try {
        let adminData=await Admin.find();
        if(adminData){
            return res.render('userpanel/about',{
                adminData:adminData
            })
        }else{
            req.flash('error','something wrong !')
            return res.redirect('back')
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.contact=async(req,res)=>{
    try {
        return res.render('userPanel/contact')
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addContact=async(req,res)=>{
    try{
        req.body.created_date=moment().format('LLL');
        let addData=await contactModel.create(req.body);
        if(addData){
           let checkEmail=await contactModel.findOne({email:req.body.email});
           if(checkEmail){
            const transporter = nodemailer.createTransport({
                host: "smtp.GMAIL.COM",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "pdudhat27@gmail.com",
                  pass: "mwfmuosjsoikcgmh",
                },
              });
             
              var msg=`<h1>Thank You For Contact Us</h1>`
              const info = await transporter.sendMail({
                from: 'pdudhat27@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Website Link", // Subject line
                text: "Hello world?", // plain text body
                html: msg// html body
              });
              return res.redirect('/contact');
           }
        }
        else{
            req.flash('error','Error');
            return res.redirect('back');
        }
        
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.work_three_columns=async(req,res)=>{
    try {
        let catData=await categoryModel.find({status:true});
        let subcatData=await subcategoryModel.find({status:true});
        return res.render('userpanel/work_three_columns',{
            catData:catData,
            subcatData:subcatData
        })
    } catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}