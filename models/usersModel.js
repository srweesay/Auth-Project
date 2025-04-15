const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:[true,"Email is required"],
        trim:true,
        unique:[true,"Email must be unique"],
        minLength:[5, "Email must have 5 characters"],
        lowercase:true
    },
    password:{
        type:String,
        require:[true,"Password must be provided!"],
        trim:true,
        select:false
    },

    verified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        select:false
    },
    verificationCodeValidation:{
        type:Number,
        select:false
    },
    forgotPasswordCode:{
        type:String,
        select:false
    },
    forgotPasswordCodeValidtion:{
        type:Number,
        select:false
    }
},
{timestamps:true})

module.exports = mongoose.model("User", userSchema)