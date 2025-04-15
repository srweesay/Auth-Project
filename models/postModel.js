const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:[true,"Title is required"],
        tirm:true
    },
    description:{
        type:String,
        require:[true,"Description is required"],
        tirm:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },

},
{timestamps:true}
)

module.exports= mongoose.model("Post",postSchema)