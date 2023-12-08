const express = require('express')
const {getAllBlogsController,UserBlogController,createBlogController,updateBlogController,deleteBlogController,getBlogIdController} = require("../controllers/blogController")
const router = express.Router();
router.get("/all-blog",getAllBlogsController)
router.post("/create-blog",createBlogController)
router.put("/update-blog/:id",updateBlogController)
router.get("/get-blog/:id",getBlogIdController)
router.delete("/delete-blog/:id",deleteBlogController)
router.get("/user-blog/:id",UserBlogController)

module.exports =router;