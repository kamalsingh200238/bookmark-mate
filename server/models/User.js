const mongoose =require("mongoose")

const UserSchema =new mongoose.Schema({
    
    username:{
        type:String,
        min:4,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        min:8,
        required:true,
    }
},{
    timestamps:true
})


module.exports =mongoose.model("User",UserSchema)