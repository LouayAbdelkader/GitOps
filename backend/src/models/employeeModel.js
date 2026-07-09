const db = require("../config/db");


// Get all employees

exports.getAllEmployees = async()=>{


const result = await db.query(

`
SELECT 
employees.*,

departments.name AS department_name

FROM employees

LEFT JOIN departments

ON employees.department_id = departments.id

ORDER BY employees.id

`

);


return result.rows;


};




// Get employee by id

exports.getEmployeeById = async(id)=>{


const result = await db.query(

`
SELECT 

employees.*,

departments.name AS department_name


FROM employees


LEFT JOIN departments


ON employees.department_id = departments.id


WHERE employees.id=$1

`,

[id]


);


return result.rows[0];


};




// Create employee

exports.createEmployee = async(data)=>{


const {

first_name,

last_name,

email,

phone,

position,

salary,

hire_date,

department_id


}=data;



const result = await db.query(

`
INSERT INTO employees

(
first_name,
last_name,
email,
phone,
position,
salary,
hire_date,
department_id
)

VALUES

($1,$2,$3,$4,$5,$6,$7,$8)


RETURNING *

`,

[

first_name,

last_name,

email,

phone,

position,

salary,

hire_date,

department_id

]


);



return result.rows[0];


};




// Update employee


exports.updateEmployee = async(id,data)=>{


const {

first_name,

last_name,

email,

phone,

position,

salary,

hire_date,

department_id

}=data;



const result = await db.query(

`
UPDATE employees

SET

first_name=$1,

last_name=$2,

email=$3,

phone=$4,

position=$5,

salary=$6,

hire_date=$7,

department_id=$8,

updated_at=CURRENT_TIMESTAMP


WHERE id=$9


RETURNING *

`,

[

first_name,

last_name,

email,

phone,

position,

salary,

hire_date,

department_id,

id

]


);



return result.rows[0];


};




// Delete employee


exports.deleteEmployee = async(id)=>{


await db.query(

"DELETE FROM employees WHERE id=$1",

[id]

);


};