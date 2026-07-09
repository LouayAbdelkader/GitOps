const User = require("../models/userModel");

const {
    hashPassword,
    comparePassword
}=require("../utils/password");


const {
    generateToken
}=require("../utils/jwt");




// REGISTER

exports.register = async(req,res)=>{


try{


const {
    full_name,
    username,
    email,
    password
}=req.body;



const existing =
await User.findByEmail(email);



if(existing){

return res.status(400).json({

message:"Email already exists"

});

}



const existingUsername =
await User.findByUsername(username);



if(existingUsername){

return res.status(400).json({

message:"Username already exists"

});

}



const hashed =
await hashPassword(password);



const user =
await User.createUser(

    full_name,
    username,
    email,
    hashed

);



res.status(201).json({

message:"User created",

user

});



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// LOGIN


exports.login = async(req,res)=>{


try{


const {
    email,
    password
}=req.body;



const user =
await User.findByEmail(email);



if(!user){

return res.status(404).json({

message:"User not found"

});

}




const valid =
await comparePassword(

password,

user.password

);



if(!valid){


return res.status(401).json({

message:"Wrong password"

});


}



const token =
generateToken(user);



res.json({

message:"Login success",

token

});



}catch(error){


res.status(500).json({

error:error.message

});


}


};