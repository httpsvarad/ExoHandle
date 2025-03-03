const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const instituteRoutes = require('./instRouter');
const semisterRoutes = require('./semisterRouter');
const devisionRoutes = require('./divisionRouter');
const classrooms = require('../controllers/classrooms');
const benches = require('./benches');
const {login} = require('../controllers/UserAuthController');
const exam = require('./examRouter');
const {sendOtp} = require('../controllers/otpverify');
//setup test routes

router.post('/auth',login)
router.post('/sendotp',sendOtp)

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