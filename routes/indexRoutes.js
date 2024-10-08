const express = require("express");
const router = express.Router();

const {
    currentUser,
     homepage,
     studentsignup,
     studentsignin,
     studentsignout,
     studentsendmail,
     studentforgetlink,
     studentresetpassword,
     studentupdate,
     studentavatar,


 } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/",isAuthenticated, homepage)


router.post("/student",isAuthenticated, currentUser)

router.post("/student/signup", studentsignup)

router.post("/student/signin", studentsignin)

router.get("/student/signout", isAuthenticated,studentsignout)


//get /student/ send-mail

router.post("/student/send-mail", studentsendmail)

//get student forget link

router.get("/student/forget-link/:id", studentforgetlink);

//post /student /reset-password/ :studentid link

router.post("/student/reset-password/:id", studentresetpassword);


//post /student /update/ :studentid link

router.post("/student/update/:id", isAuthenticated, studentupdate);



//post /student /avatar/ :studentid link

router.post("/student/avatar/:id", isAuthenticated, studentavatar);



module.exports = router;