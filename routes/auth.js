const express = require("express");
const router = express.Router();


//import l packae el json web toke
const jwt = require ("jsonwebtoken");

const {register,login}=require("../controllers/authController")


// /api/auth/register
router.post("/register",register);

// /api/auth/login
router.post("/login",login);



module.exports = router;
