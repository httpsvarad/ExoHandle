const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const instituteRoutes = require('./instRouter');
const semisterRoutes = require('./semisterRouter');
const devisionRoutes = require('./divisionRouter');
const classrooms = require('../controllers/classrooms');
const benches = require('./benches');
const exam = require('./examRouter');
//setup test routes


router.use('/division',devisionRoutes)
router.get('/user', userController.createUser)

router.use('/institute',instituteRoutes)
router.use('/semister',semisterRoutes)
router.use('/room',classrooms)
router.use('/bench',benches)

router.use('/exam',exam)

router.get('/', (req,res)=> {
  res.send("HELLO WORLD!")
})



module.exports = router;