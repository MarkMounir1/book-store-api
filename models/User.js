const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require ("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity")
// User Schema

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200,
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

//Generate Token
UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin},process.env.JWT_SECRET_KEY);
}


//User Model
const User = mongoose.model("User",UserSchema);

//Validate Register User

function validateRegisterUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: passwordComplexity().required(),
        //isAdmin: Joi.bool(),
    });
    return schema.validate(obj);
}

//Validate Login User

function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
        
    });
    return schema.validate(obj);
}

//Validate Update User

function validateUpdateUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(6),
        //isAdmin: Joi.bool(),
    });
    return schema.validate(obj);
}

//Validate change Password
function validateChangePassword(obj){
    const schema = Joi.object({
        
        password: passwordComplexity().required(),
        
    });
    return schema.validate(obj);
}


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateChangePassword
};