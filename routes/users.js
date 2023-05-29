const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
//imprt l package el hashing
const bcrypt = require("bcryptjs");

const {User , validateUpdateUser} = require("../models/User")
// import el verify token
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");


/**
 * @desc  Update User
 * @route  /api/users/:id
 * @method  PUT
 * @access  private
 */

router.put("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
    //hna ba2a han2akd el token lw el id eli had5lo w eli mawgood
    //el goz2 dh han5leh  f middle ware 3shan haytkarr kter
    /*
    if(req.user.id!==req.params.id){
        return res.status(403) //forbidden
        .json({message: "You Are Not Allowed, you can only update your profile"});
    }
    */

    const {error}=validateUpdateUser(req.body);

    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    //el user 3shan y3adl fl account bta3o lazm ydena el token bta3o
    //console.log(req.headers);

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
    }


    const updatedUser= await User.findByIdAndUpdate(req.params.id,{
        $set:{
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }
    },{new: true}).select("-password"); // deh 3shan matrg3sh el password mn el database ll user 5leh hidden
    res.status(200).json(updatedUser);
}));

/**
 * @desc  Get All Users
 * @route  /api/users
 * @method  GET
 * @access  private (only admin)
 */

router.get("/",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    
    const users = await User.find().select("-password") //haygeb kol el users mn 8er passwords

    
    res.status(200).json(users);
}));

/**
 * @desc  Get User By Id
 * @route  /api/users/:id
 * @method  GET
 * @access  private (only admin & user himself)
 */

router.get("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
    
    const user = await User.findById(req.params.id).select("-password") //haygeb kol el users mn 8er passwords

    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: "User not found"});
    }

    res.status(200).json(users);
}));


/**
 * @desc  Delete User By Id
 * @route  /api/users/:id
 * @method  DELETE
 * @access  private (only admin & user himself)
 */

router.delete("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
    
    const user = await User.findById(req.params.id).select("-password") //haygeb kol el users mn 8er passwords

    if(user){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"user has been deleted successfully"});
    }else{
        res.status(404).json({message: "User not found"});
    }

}));




module.exports = router;
