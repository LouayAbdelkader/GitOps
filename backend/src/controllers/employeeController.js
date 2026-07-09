const Employee =
require("../models/employeeModel");




// GET ALL

exports.getEmployees = async(req,res)=>{


try{


const employees =
await Employee.getAllEmployees();


res.json(employees);



}catch(error){


res.status(500).json({

error:error.message

});


}


};




// GET ONE

exports.getEmployee = async(req,res)=>{


try{


const employee =

await Employee.getEmployeeById(

req.params.id

);



if(!employee)

return res.status(404).json({

message:"Employee not found"

});



res.json(employee);



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// CREATE


exports.createEmployee = async(req,res)=>{


try{


const employee =

await Employee.createEmployee(

req.body

);



res.status(201).json(employee);



}catch(error){


res.status(500).json({

error:error.message

});


}


};






// UPDATE


exports.updateEmployee = async(req,res)=>{


try{


const employee =

await Employee.updateEmployee(

req.params.id,

req.body

);



res.json(employee);



}catch(error){


res.status(500).json({

error:error.message

});


}


};





// DELETE


exports.deleteEmployee = async(req,res)=>{


try{


await Employee.deleteEmployee(

req.params.id

);



res.json({

message:"Employee deleted"

});



}catch(error){


res.status(500).json({

error:error.message

});


}


};