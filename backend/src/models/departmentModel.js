const db = require("../config/db");


// Get all departments

exports.getAllDepartments = async()=>{


    const result = await db.query(

        "SELECT * FROM departments ORDER BY id"

    );


    return result.rows;

};



// Get department by id

exports.getDepartmentById = async(id)=>{


    const result = await db.query(

        "SELECT * FROM departments WHERE id=$1",

        [id]

    );


    return result.rows[0];

};




// Create department

exports.createDepartment = async(
    name,
    description
)=>{


    const result = await db.query(

        `
        INSERT INTO departments
        (name,description)

        VALUES($1,$2)

        RETURNING *
        `,

        [
            name,
            description
        ]

    );


    return result.rows[0];

};




// Update department

exports.updateDepartment = async(
    id,
    name,
    description
)=>{


    const result = await db.query(

        `
        UPDATE departments

        SET name=$1,
        description=$2

        WHERE id=$3

        RETURNING *
        `,

        [
            name,
            description,
            id
        ]

    );


    return result.rows[0];

};




// Delete department

exports.deleteDepartment = async(id)=>{


    await db.query(

        "DELETE FROM departments WHERE id=$1",

        [id]

    );


};