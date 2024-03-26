const express=require('express')
const routs=express.Router();
const photosController=require('../controllers/photosController')
const photosModel=require('../models/photosModel')

routs.get('/add_photos',photosController.add_photos)
routs.post('/insertPhotosData',photosModel.photosUploads,photosController.insertPhotosData)
routs.get('/view_photos',photosController.view_photos)
routs.get('/delete_photos/:id',photosController.delete_photos);
routs.get('/edit_photos',photosController.edit_photos)
routs.post('/editPhotosData/:id',photosModel.photosUploads,photosController.editPhotosData)

module.exports=routs;