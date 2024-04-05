const mongoose =require("mongoose");

const commonOpts = {unique: true, required: true}

const User_Schema={
    name:{
        type:String,
        ...commonOpts,
    },
    _id:{
        type:Number,
        ...commonOpts,
    },
    email:{
        type:String,
        ...commonOpts,
    },
    password:{
        type:String,
        ...commonOpts,
    },
};

const userS=new mongoose.Schema(User_Schema);

const users=mongoose.model("user_details",userS);

module.exports={users};