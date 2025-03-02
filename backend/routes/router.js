const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")

//setup test routes
router.get('/user', userController.createUser)
router.get('/', (req,res)=> {
  res.send("HELLO WORLD!")
})


module.exports = router;