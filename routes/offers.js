const express=require('express')
const routs=express.Router();
const offersController=require('../controllers/offersController')

routs.get('/add_offers',offersController.add_offers)
routs.post('/insertOffersData',offersController.insertOffersData)
routs.get('/view_offers',offersController.view_offers)
routs.get('/delete_offers/:id',offersController.delete_offers);
routs.get('/edit_offers',offersController.edit_offers);
routs.post('/editOffersData/:id',offersController.editOffersData)


module.exports=routs;