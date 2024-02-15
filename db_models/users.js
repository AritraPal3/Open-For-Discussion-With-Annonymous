const mongoose =require("mongoose");

const User_Schema={
    name:String,
    _id:String,
    ip:String
};

const userS=new mongoose.Schema(User_Schema);

const user_model=mongoose.model("user_details",userS);

module.exports=user_model;