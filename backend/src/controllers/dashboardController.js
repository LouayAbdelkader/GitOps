const db = require("../config/db");



exports.getDashboardStats = async(req,res)=>{


try{


// users count

const users = await db.query(

"SELECT COUNT(*) FROM users"

);




// employees count

const employees = await db.query(

"SELECT COUNT(*) FROM employees"

);




// active employees

const activeEmployees = await db.query(

`
SELECT COUNT(*)

FROM employees

WHERE status='ACTIVE'

`

);




// inactive employees

const inactiveEmployees = await db.query(

`
SELECT COUNT(*)

FROM employees

WHERE status='INACTIVE'

`

);




// departments count

const departments = await db.query(

"SELECT COUNT(*) FROM departments"

);





res.json({

users:
parseInt(users.rows[0].count),


employees:
parseInt(employees.rows[0].count),


activeEmployees:
parseInt(activeEmployees.rows[0].count),


inactiveEmployees:
parseInt(inactiveEmployees.rows[0].count),


departments:
parseInt(departments.rows[0].count)

});




}catch(error){


res.status(500).json({

error:error.message

});


}



};