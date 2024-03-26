const express=require('express');
const routs=express.Router();
const userController=require('../controllers/userController')
const commentModel=require('../models/commentModel')
const contactController=require('../controllers/contactController')

routs.get('/',userController.home)
routs.get('/blog_single/:id',userController.blog_single)
routs.post('/addPostComment',commentModel.uploadImage,userController.addPostComment);

// about page
routs.get('/about',userController.about)
// contact page
routs.get('/contact',userController.contact)
routs.post('/addContact',userController.addContact)
// work page
routs.get('/work_three_columns',userController.work_three_columns)
module.exports=routs;

