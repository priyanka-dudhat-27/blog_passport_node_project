const Admin=require('../models/adminModel');
const path=require('path');
const fs=require('fs');
const nodemailer=require('nodemailer');
const sliderModel=require('../models/sliderModel')

module.exports.logIn=async(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard')
    }
    return res.render('login');
}
module.exports.signIn=async(req,res)=>{
    console.log(req.body);

    try{
        req.flash('success','login successfully')
        return res.redirect('/admin/dashboard')
    }
    catch(err){
        console.log(err);
        req.flash('error','Invalid Credential')
        return res.redirect('back');
    }

}
module.exports.dashboard=async(req,res)=>{
   
    let adminData=await Admin.find().countDocuments();
    let sliderData=await sliderModel.find().countDocuments();

    return res.render('dashboard',{
        adminData:req.user,
        adminData:adminData,
        sliderData:sliderData

    })
}
module.exports.addAdmin=async(req,res)=>{
   
    return res.render('add_admin',{
        adminData:req.user
    });
}
module.exports.viewAdmin = async (req, res) => {
    try {
        var page = 0;
        var per_page = 2;
        
        var search = ''; 
        
        if (req.query.search) {
            search = req.query.search;
        }

        let allRecord = await Admin.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }).countDocuments();

        let totalpage = Math.ceil((allRecord / per_page));

        console.log(totalpage);

        if (req.query.page) {
            page = req.query.page;
        }

        let adminData = await Admin.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        })
            .skip(page * per_page)
            .limit(per_page);

        return res.render('view_admin', {
            adminRecord: adminData,
            adminData: req.user,
            search: search,
            totalpage: totalpage,
            currentPage: page,
            per_page:per_page
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.insertAdminData=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        var img='';
        if(req.file){
            img=Admin.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;
        req.body.status=true;
        let adminData=await Admin.create(req.body);
        if(adminData){
            console.log('Admin Record inserted');
            return res.redirect('/admin/add_admin');
        }
        else{
            console.log('something is wrong!');
            return res.redirect('/admin/add_admin');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/admin/add_admin');
    }
    
}
module.exports.deleteAdmin=async(req,res)=>{
    try{
            let single=await Admin.findById(req.params.id);
        if(single){
            let imagePath=path.join(__dirname,'..',single.image);
            await fs.unlinkSync(imagePath);
        }
        else{
            console.log('wrong!');
            return res.redirect('back');
        }
        let del=await Admin.findByIdAndDelete(req.params.id);
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
module.exports.editAdmin=async(req,res)=>{
    let findAdmin=await Admin.findById(req.query.id);
   return res.render('edit_admin',{
    adminRecord:findAdmin,
    adminData:req.user

   });
}
module.exports.editAdminData=async(req,res)=>{
  try{
    if(req.file){
        let findData=await Admin.findById(req.params.id);
        if(findData){
            let imagePath=path.join(__dirname,'..',findData.image);
            await fs.unlinkSync(imagePath);
        }
        var img='';
        req.body.image=Admin.iPath+'/'+req.file.filename;
    }
    else{
        let findData=await Admin.findById(req.params.id);
        if(findData){
            req.body.image=findData.image;
            req.body.name=req.body.fname+' '+req.body.lname;
        }
    }
    await Admin.findByIdAndUpdate(req.params.id,req.body);
    return res.redirect('/admin/view_admin');
}catch(err){
    console.log(err);
    return res.redirect('back')
}
  }

module.exports.profile=async(req,res)=>{

    return res.render('profile',{
        adminData:req.user
    });
}

module.exports.password=async(req,res)=>{
    if(req.cookies.admin=='undefined'){
        return res.redirect('/admin');
    }

    return res.render('password',{
        adminData:req.user
    });

}
module.exports.changePass=async(req,res)=>{
    
    var dbpass=req.cookies.admin.password;
    console.log(dbpass);
    console.log(req.body);
    if(dbpass==req.body.cpass){
        if(req.body.cpass!=req.body.npass){
            if(req.body.npass==req.body.conpass){
                await Admin.findByIdAndUpdate(req.cookies.admin._id,{
                    password:req.body.npass,
                })
                return res.redirect('/admin/logout')
            }
            else{
                console.log('both are not same!');
                return res.redirect('back');
            }
        }
        else{
            console.log('both are same!');
            return res.redirect('back');
        }
    }
    else{
        console.log('current wrong!');
        return res.redirect('back');
    }
}

module.exports.forgetPass=async(req,res)=>{
    try{
        return res.render('forgetPass');
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.checkEmailForget=async(req,res)=>{
    try{
        console.log(req.body);    
        let checkEmail=await Admin.findOne({email:req.body.email});
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

              var otp=Math.round(Math.random()*10000)
              res.cookie('otp',otp);
              res.cookie('email',req.body.email);
              var msg=`<h1>RnW inbstitute: <b>otp:${otp}</b></h1>`
              const info = await transporter.sendMail({
                from: 'pdudhat27@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Your OTP is Here", // Subject line
                text: "Hello world?", // plain text body
                html: msg,otp // html body
              });
              return res.redirect('/admin/checkOTP');

        }
        else{
            console.log('Invalid Email');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.checkOTP=async(req,res)=>{
    return res.render('checkOTP');
}

module.exports.verifyOtp=async(req,res)=>{
    console.log(req.body);
    console.log(req.cookies.otp);
    try{
        if(req.body.otp==req.cookies.otp){
            return res.redirect('/admin/adminChangePassword')
        }else{
            console.log('otp not match');
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.adminChangePassword=async(req,res)=>{
    return res.render('adminChangePassword');
     
}

module.exports.resetPass=async(req,res)=>{
    console.log(req.body.npass);
    console.log(req.body.conpass);
    try{
        if(req.body.npass==req.body.conpass){
            var email=req.cookies.email;
            console.log(email);

            let checkEmail=await Admin.findOne({email:email});
            if(checkEmail){
                let changePass=await Admin.findByIdAndUpdate(checkEmail.id,{
                    password:req.body.npass
                })
                if(changePass){
                    res.clearCookie('email');
                    res.clearCookie('otp');

                    return res.redirect('/admin/')

                }
            }else{
                console.log('invalid email');
                return res.redirect('back')
            }
        }else{
            console.log('new and confirm password not match');
            return res.redirect('back');

        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.deleteMultipleRecords=async(req,res)=>{
    try{
        console.log(req.body);
        let delmultiple=await Admin.deleteMany({_id:{$in:req.body.adminIds}});
        if(delmultiple){
            req.flash('success','multiple records deleted')
            return res.redirect('back')
        }
        else{
            req.flash('error','something wrong');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
}
module.exports.deactive =async(req,res)=>{
    try{
        let adminDeactive=await Admin.findByIdAndUpdate(req.params.id,{status:false});
        if(adminDeactive){
            req.flash('success','Record deactive successfully');
            return res.redirect('back')
        }else{
            req.flash('error','something wrong');
            return res.redirect('back')
        }

    }
    catch(err){
        console.log(err);
    }
}
module.exports.active=async(req,res)=>{
    try{
        let adminActive=await Admin.findByIdAndUpdate(req.params.id,{status:true});
        if(adminActive){
            req.flash('success','Record successfully activated !');
            return res.redirect('back');
        }
        else{
            req.flash('error','error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
