const db = require("../config/db");


// trouver utilisateur par email

exports.findByEmail = async(email)=>{

    const result = await db.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    return result.rows[0];

};


// trouver utilisateur par username

exports.findByUsername = async(username)=>{

    const result = await db.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    return result.rows[0];

};



// créer utilisateur

exports.createUser = async(
    full_name,
    username,
    email,
    password
)=>{


    const result = await db.query(

        `
        INSERT INTO users
        (full_name,username,email,password)
        VALUES($1,$2,$3,$4)
        RETURNING id,full_name,username,email,role
        `,

        [
            full_name,
            username,
            email,
            password
        ]

    );


    return result.rows[0];

};
// Get all users

exports.getAllUsers = async()=>{


const result = await db.query(

`
SELECT 
id,
full_name,
username,
email,
role,
active,
created_at

FROM users

ORDER BY id

`

);


return result.rows;


};




// Update role

exports.updateRole = async(
    id,
    role
)=>{


const result = await db.query(

`
UPDATE users

SET role=$1

WHERE id=$2

RETURNING 
id,
full_name,
username,
email,
role

`,

[
role,
id
]

);



return result.rows[0];

};





// Update status

exports.updateStatus = async(
    id,
    active
)=>{


const result = await db.query(

`
UPDATE users

SET active=$1

WHERE id=$2

RETURNING *

`,

[
active,
id
]


);



return result.rows[0];

};






// Delete user


exports.deleteUser = async(id)=>{


await db.query(

"DELETE FROM users WHERE id=$1",

[id]

);


};