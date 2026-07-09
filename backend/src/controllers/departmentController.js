const Department =
require("../models/departmentModel");



// GET ALL

exports.getDepartments = async(req,res)=>{


try{


const departments =
await Department.getAllDepartments();


res.json(departments);



}catch(error){


res.status(500).json({

error:error.message

});


}


};




// GET BY ID

exports.getDepartment = async(req,res)=>{


try{


const department =

await Department.getDepartmentById(

req.params.id

);



if(!department){

return res.status(404).json({

message:"Department not found"

});

}



res.json(department);



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// CREATE

exports.createDepartment = async(req,res)=>{


try{


const {

name,

description

}=req.body;



const department =

await Department.createDepartment(

name,

description

);



res.status(201).json(department);



}catch(error){


res.status(500).json({

error:error.message

});


}



};





// UPDATE

exports.updateDepartment = async(req,res)=>{


try{


const {

name,

description

}=req.body;



const department =

await Department.updateDepartment(

req.params.id,

name,

description

);



res.json(department);



}catch(error){


res.status(500).json({

error:error.message

});


}


};






// DELETE

exports.deleteDepartment = async(req,res)=>{


try{


await Department.deleteDepartment(

req.params.id

);



res.json({

message:"Department deleted"

});



}catch(error){


res.status(500).json({

error:error.message

});


}



};