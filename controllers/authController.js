const User = require("../models/usersModel")
const {signupSchema} = require("../middlewares/validator")
const { doHash } = require("../utils/hashing")

exports.signup = async(req,res)=>{
    const {email,password} = req.body
    try { 

        const {error,value}= signupSchema.validate({email,password})
        if(error){
            return res.status(401).json({success:false, message: error.details[0].message})
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(401).json({success:false,message:"User already Exists"})
        }

        const hashPassword =await doHash(password,12)
        const newUser  = new User({
            email,
            password:hashPassword
        })
        const result = await newUser.save()
        result.password = undefined
        res.status(201).json({success:true, message:"you account has been created successfully", result})


        
    } catch (error) {
        console.log(error)
    }
} 

