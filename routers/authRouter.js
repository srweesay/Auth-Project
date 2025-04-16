const router = require("express").Router()
const authController = require("../controllers/authController")

router.post("/signup",authController.signup)
router.post("/signin",authController.signin)
router.post("/signout", authController.signout)
router.patch("/send-verfication-code", authController.sendVerficationCode)


module.exports = router