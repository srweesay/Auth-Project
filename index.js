const express =require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const authRouter = require("./routers/authRouter")
const app = express()


app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB has Connected")
}).catch((err)=>{
    console.log(err)
})
app.use("/api/auth",authRouter)
app.get("/",(req,res)=>{
    res.json({message:"this is from the server"})
})

app.listen(process.env.PORT,()=>{
    console.log("server has started listinig")
})



