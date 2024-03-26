const express=require('express')
const routs=express.Router();
const sliderController=require('../controllers/sliderController')
const sliderModel=require('../models/sliderModel')

routs.get('/add_slider',sliderController.add_slider)
routs.post('/insertSliderData',sliderModel.sliderUploads,sliderController.insertSliderData)
routs.get('/view_slider',sliderController.view_slider)
routs.get('/delete_slider/:id',sliderController.delete_slider);
routs.get('/edit_slider',sliderController.edit_slider);
routs.post('/edit_sliderData/:id',sliderModel.sliderUploads,sliderController.edit_sliderData);
routs.post('/deleteMultipleRecords',sliderController.deleteMultipleRecords);



module.exports=routs;