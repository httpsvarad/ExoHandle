const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const instituteRoutes = require('./instRouter');
const semisterRoutes = require('./semisterRouter');
//setup test routes
router.use('/institute',instituteRoutes)
router.use('/semister',semisterRoutes)
router.get('/user', userController.createUser)
router.get('/', (req,res)=> {
  res.send("HELLO WORLD!")
})



module.exports = router;