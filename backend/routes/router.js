const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const instituteRoutes = require('./instRouter');
const semisterRoutes = require('./semisterRouter');
const devisionRoutes = require('./divisionRouter')
//setup test routes


router.use('/division',devisionRoutes)
router.get('/user', userController.createUser)

router.use('/institute',instituteRoutes)
router.use('/semister',semisterRoutes)
router.get('/', (req,res)=> {
  res.send("HELLO WORLD!")
})



module.exports = router;