const express=require('express')
const routs=express.Router();
const othersController=require('../controllers/otherController')

routs.get('/add_others',othersController.add_others)
routs.post('/insertOthersData',othersController.insertOthersData)
routs.get('/view_others',othersController.view_others)
routs.get('/delete_others/:id',othersController.delete_others);
routs.get('/edit_others',othersController.edit_others)
routs.post('/editOthersData/:id',othersController.editOthersData)


module.exports=routs;