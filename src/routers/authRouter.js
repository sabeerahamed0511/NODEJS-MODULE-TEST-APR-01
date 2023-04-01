const router = require("express").Router();
const controller = require("../controllers/authController");

router.post("/signup", controller.creatingNewUser);

router.post("/login", controller.userLogin);

module.exports = router;