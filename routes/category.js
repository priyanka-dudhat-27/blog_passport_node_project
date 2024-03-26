const express=require('express');
const routs=express.Router();
const categoryController=require('../controllers/categoryController');
const categoryModel=require('../models/categoryModel')

routs.get('/add_category',categoryController.add_category);
routs.post('/insertcategoryData',categoryController.insertcategoryData);
routs.get('/view_category',categoryController.view_category);
routs.get('/delete_category/:id',categoryController.delete_category);
routs.get('/update_category/:id',categoryController.update_category);


module.exports=routs;