const router = require("express").Router();


const controller =

require("../controllers/departmentController");



const authMiddleware =

require("../middleware/authMiddleware");



const roleMiddleware =

require("../middleware/roleMiddleware");




// Toutes les routes protégées

router.use(authMiddleware);




// GET

router.get(

"/",

controller.getDepartments

);



// GET ID

router.get(

"/:id",

controller.getDepartment

);




// CREATE

router.post(

"/",

roleMiddleware("ADMIN","MANAGER"),

controller.createDepartment

);




// UPDATE

router.put(

"/:id",

roleMiddleware("ADMIN","MANAGER"),

controller.updateDepartment

);




// DELETE ADMIN seulement

router.delete(

"/:id",

roleMiddleware("ADMIN"),

controller.deleteDepartment

);



module.exports = router;