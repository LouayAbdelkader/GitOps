const router =
require("express").Router();


const controller =
require("../controllers/dashboardController");


const authMiddleware =
require("../middleware/authMiddleware");



router.get(

"/",

authMiddleware,

controller.getDashboardStats

);



module.exports = router;