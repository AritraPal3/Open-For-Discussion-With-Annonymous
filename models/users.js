const mongoose =require("mongoose");

const User_Schema={
    name:{
        String,
        unique,
    },
    _id:{
        Number,
        unique,
    },
    email:{
        String,
        unique,
    },
    password:{
        String,
        unique,
    },
};

const userS=new mongoose.Schema(User_Schema);

const users=mongoose.model("user_details",userS);

module.exports={users};