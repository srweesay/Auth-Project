const router = require("express").Router()
const { identifier } = require("../middlewares/identification")
const postsController = require("../controllers/postsController")


router.get("/all-posts",postsController.getPosts)
// router.get("/single-posts",authController.signin)
// router.post("/create-posts", identifier, authController.signout)
// router.put("/update-posts", authController.sendVerficationCode)
// router.delete("/delete-posts", authController.verifyVerificationCode)

module.exports = router