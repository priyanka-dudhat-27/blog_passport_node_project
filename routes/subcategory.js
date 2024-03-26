const express=require('express');
const routs=express.Router();
const subcategoryController=require('../controllers/subcategoryController');
const subcategoryModel=require('../models/subcategoryModel')

routs.get('/add_subcategory',subcategoryController.add_subcategory);
routs.post('/insert_subcategoryData',subcategoryModel.uploadImage,subcategoryController.insert_subcategoryData);

module.exports=routs;

