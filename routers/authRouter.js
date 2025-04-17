const router = require("express").Router()
const authController = require("../controllers/authController")
const { identifier } = require("../middlewares/identification")


router.post("/signup",authController.signup)
router.post("/signin",authController.signin)
router.post("/signout", identifier, authController.signout)
router.patch("/send-verfication-code", authController.sendVerficationCode)
router.patch("/verify-verification-code", authController.verifyVerificationCode)
router.patch("/change-password", identifier, authController.changePassword)
router.patch("/send-forgot-password-code", authController.sendForgotPasswordCode)
router.patch("/verify-forgot-password-code", authController.verifyForgotPasswordCode)

module.exports = router