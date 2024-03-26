const express=require('express');
const routs=express.Router();
const adminController=require('../controllers/adminController');
const Admin=require('../models/adminModel');
const passport=require('passport');
const passportLocal=require('../config/passportLocal')

routs.get('/dashboard',passport.checkAuth,adminController.dashboard);
routs.get('/',adminController.logIn)
routs.post('/signIn',passport.authenticate('local',{failureRedirect:'/admin/',failureFlash:'invalid crentials'}),adminController.signIn)
routs.get('/add_admin',passport.checkAuth,adminController.addAdmin);
routs.get('/view_admin',passport.checkAuth,adminController.viewAdmin);
routs.post('/insertAdminData',Admin.uploadImage,adminController.insertAdminData);
routs.get('/deleteAdmin/:id',adminController.deleteAdmin);
routs.get('/editRecord',passport.checkAuth,adminController.editAdmin);
routs.post('/editAdminData/:id',Admin.uploadImage,adminController.editAdminData);
routs.get('/logout',async(req,res)=>{
    res.clearCookie('admin');
    return res.redirect('/admin');
})
routs.get('/profile',passport.checkAuth,adminController.profile)
routs.get('/password',passport.checkAuth,adminController.password);
routs.post('/changePass',adminController.changePass);
routs.get('/forgetPass',adminController.forgetPass)
routs.post('/checkEmailForget',adminController.checkEmailForget)
routs.get('/checkOTP',adminController.checkOTP)
routs.post('/verifyOtp',adminController.verifyOtp)
routs.get('/adminChangePassword',adminController.adminChangePassword)
routs.post('/resetPass',adminController.resetPass)
routs.post('/deleteMultipleRecords',adminController.deleteMultipleRecords)
routs.get('/deactive/:id',adminController.deactive)
routs.get('/active/:id',adminController.active)

// Blog Website
//slider
routs.use('/slider',passport.checkAuth,require('./slider'))
routs.use('/others',passport.checkAuth,require('./others'))
routs.use('/photos',passport.checkAuth,require('./photos'))
routs.use('/offers',passport.checkAuth,require('./offers'))
routs.use('/posts',passport.checkAuth,require('./posts'))
routs.use('/comments',passport.checkAuth,require('./comments'));
routs.use('/category',passport.checkAuth,require('./category'));
routs.use('/subcategory',passport.checkAuth,require('./subcategory'));
routs.use('/contact',passport.checkAuth,require('./contact'));


module.exports=routs;