const express= require('express');
const router=express.Router();

//import controoler
const {dummylink,dummyunlink}=require("../controller/like");
const {dummypost,getallpost}=require("../controller/post");
const {dummycomment}=require("../controller/comment");

//define api routes
router.post("/likes/like",dummylink);
router.post("/likes/unlike",dummyunlink);
// router.get("/comment",dummycomment);
router.get("/getallpost",getallpost);
router.post("/comment/create",dummycomment);
router.post("/post/create",dummypost);
module.exports=router;