const express = require('express');
const routs=express.Router();
const contactController=require('../controllers/contactController')

routs.get('/view_contact',contactController.view_contact)

module.exports=routs;