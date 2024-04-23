const express = require("express")
const router = express.Router()
const { register } = require("../controllers/auth")
const {signIn} = require("../controllers/auth")

router.post("/register", register)

router.post("/signIn", signIn)

module.exports = router