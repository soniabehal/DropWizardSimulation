const express=require("express");
const router=express.Router();
const folderRoutes=require("./folder");
const contentRoutes=require("./content");

router.use("/folder",folderRoutes);
router.use("/content",contentRoutes);

module.exports=router;