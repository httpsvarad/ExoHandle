const express = require("express")
const router = express.Router();
const userController = require("./userRouter");
const instituteRoutes = require('./instRouter');
const semisterRoutes = require('./semisterRouter');
const devisionRoutes = require('./divisionRouter');
const classrooms = require('../controllers/classrooms');
const benches = require('./benches');
const {login} = require('../controllers/UserAuthController');
const exam = require('./examRouter');
const {sendOtp} = require('../controllers/otpverify');
const subject = require('./subjectRouter');
const batch = require('./batchRouter');
const examsession = require('./examSessionRouter');
const examSessionTeacher = require('./examSessionTeacherRouter');
const examTeacherArrangement = require('./examTeacherArrangementRouter');
const { assignSeating } = require("../controllers/seatingarrange"); 
//setup test routes

router.post('/auth',login)
router.post('/sendotp',sendOtp)

router.use('/division',devisionRoutes)



// router.post("/assign-seating", assignSeating);
router.use('/user', userController)
router.use('/institute',instituteRoutes)
router.use('/semister',semisterRoutes)
router.use('/room',classrooms)
router.use('/bench',benches)
router.use('/subjects',subject)
router.use('/exam',exam)
router.use('/batch',batch)
router.use('/examsession', examsession)
router.use('/examsessionteacher', examSessionTeacher)
router.use('/examteacherarrangement', examTeacherArrangement)


router.get('/', (req,res)=> {
  res.send("HELLO WORLD!")
})



module.exports = router;