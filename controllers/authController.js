const jwt = require("jsonwebtoken")
const User = require("../models/usersModel")
const {signupSchema, sigininSchema} = require("../middlewares/validator")
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing")
const transport = require("../middlewares/sendMail")



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


exports.signin = async(req,res)=>{
    const{email,password} = req.body

    try {
        const {error, value} = sigininSchema.validate({email,password})

        if(error){
            return res.status(401).json({success:false, message:error.details[0].message})
        }

        const existingUser = await User.findOne({email}).select("+password")

        if(!existingUser){
            return res.status(401).json({success:false, message:"User Doesnot exist"})
        }

        const result = await doHashValidation(password, existingUser.password)

        if(!result){
            return res.status(401).json({success:false, message:"Invalid Credential"})
        }

        const token = jwt.sign({
            userId:existingUser._id,
            email:existingUser.email,
            verified:existingUser.verified 
        },process.env.TOKEN_SECRET,{expiresIn:"8h"})

res.cookie("Authorization", "Bearer" + token,{expires:new Date(Date.now() + 8 * 3600000), httpOnly:process.env.NODE_ENV === "production", secure:process.env.NODE_ENV==="production"}).
        json({success:true,token,message:"Logged in successfully"})


    } catch (error) {
        console.log(error)
    }
} 


exports.signout = async(req,res)=>{
    res.clearCookie("Authorization").status(200).json({message:"Logged Out Successfully"})
}

exports.sendVerficationCode = async (req, res) => {
    const { email } = req.body;
    console.log("⏳ Received request to send verification code to:", email);
  
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        console.log("❌ User not found");
        return res.status(404).json({ success: false, message: "User does not exist" });
      }
  
      if (existingUser.verified) {
        console.log("✅ User already verified");
        return res.status(400).json({ success: false, message: "You are already verified" });
      }
  
      const codeValue = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      console.log("📩 Generated code:", codeValue);
  
      let info = await transport.sendMail({
        from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        to: existingUser.email,
        subject: "Verification Code",
        html: "<h1>" + codeValue + "</h1>",
      });
  
      console.log("📤 Mail sent info:", info);
  
      if (info.accepted[0] === existingUser.email) {
        const hashedcodeValue = hmacProcess(codeValue, process.env.HMAC_VERFICATION_CODE_SECRET);
        existingUser.verificationCode = hashedcodeValue;
        existingUser.verificationCodeValidation = Date.now();
        await existingUser.save();
  
        console.log("✅ Code hashed and user saved");
        return res.status(200).json({ success: true, message: "Code Sent!" });
      }
  
      console.log("❌ Email not accepted by recipient");
      res.status(400).json({ success: false, message: "Code send failed" });
    } catch (error) {
      console.error("🔥 ERROR in sendVerficationCode:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  