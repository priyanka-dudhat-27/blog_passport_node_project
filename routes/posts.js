const express=require('express')
const routs=express.Router();
const postsController=require('../controllers/postsController')
const postModel=require('../models/postModel')

routs.get('/add_posts',postsController.add_posts)
routs.post('/insertPostsData',postModel.postUploads,postsController.insertPostsData)
routs.get('/view_posts',postsController.view_posts)
routs.get('/delete_posts/:id',postsController.delete_posts)




module.exports=routs;