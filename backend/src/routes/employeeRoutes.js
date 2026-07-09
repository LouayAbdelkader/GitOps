const router =
require("express").Router();


const controller =
require("../controllers/employeeController");


const authMiddleware =
require("../middleware/authMiddleware");



router.use(authMiddleware);



// GET

router.get(
"/",
controller.getEmployees
);



// GET ID

router.get(
"/:id",
controller.getEmployee
);



// CREATE

router.post(
"/",
controller.createEmployee
);



// UPDATE

router.put(
"/:id",
controller.updateEmployee
);



// DELETE

router.delete(
"/:id",
controller.deleteEmployee
);



module.exports = router;