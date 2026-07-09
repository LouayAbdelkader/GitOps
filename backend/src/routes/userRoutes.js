const router =
require("express").Router();


const controller =
require("../controllers/userController");


const authMiddleware =
require("../middleware/authMiddleware");


const roleMiddleware =
require("../middleware/roleMiddleware");



// Protection JWT

router.use(authMiddleware);


// ADMIN uniquement

router.use(

roleMiddleware("ADMIN")

);




// Get users

router.get(

"/",

controller.getUsers

);





// Change role

router.put(

"/:id/role",

controller.updateUserRole

);





// Activate / deactivate

router.put(

"/:id/status",

controller.updateUserStatus

);





// Delete

router.delete(

"/:id",

controller.deleteUser

);




module.exports = router;