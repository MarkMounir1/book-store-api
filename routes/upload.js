const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path")


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../images"));
    },
    filename: function(req,file,cb){
        //hna hay5lek t upload el image mara wa7da
        //cb(null,file.originalname);
        //hna hay5lek t upload el image kaza mara lw hya nafs el esm w hay8yr esmaha
        cb(null,new Date().toISOString().replace(/:/g,"-") + file.originalname);
    }
})

const upload = multer({storage})

// /api/upload
router.post("/",upload.single("image"),(req,res)=>{
    res.status(200).json({message:"image uploaded"});
})


module.exports = router;