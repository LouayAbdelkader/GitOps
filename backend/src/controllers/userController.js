const User =
require("../models/userModel");




// GET USERS


exports.getUsers = async(req,res)=>{


try{


const users =
await User.getAllUsers();


res.json(users);



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// UPDATE ROLE


exports.updateUserRole = async(req,res)=>{


try{


const {

role

}=req.body;



const user =

await User.updateRole(

req.params.id,

role

);



res.json(user);



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// UPDATE STATUS


exports.updateUserStatus = async(req,res)=>{


try{


const {

active

}=req.body;



const user =

await User.updateStatus(

req.params.id,

active

);



res.json(user);



}catch(error){


res.status(500).json({

error:error.message

});


}



};







// DELETE USER


exports.deleteUser = async(req,res)=>{


try{


await User.deleteUser(

req.params.id

);



res.json({

message:"User deleted"

});



}catch(error){


res.status(500).json({

error:error.message

});


}



};