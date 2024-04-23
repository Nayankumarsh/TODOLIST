const express = require("express")
const router = express.Router()
const {addTask } = require("../controllers/list")
const {updateTask} = require("../controllers/list")
const {deleteTask} = require("../controllers/list")
const {getTasks} = require("../controllers/list")

router.post("/addTask", addTask)

router.put("/updateTask/:id", updateTask)
router.delete("/deleteTask/:id", deleteTask)
router.get("/getTask/:id", getTasks)

module.exports = router