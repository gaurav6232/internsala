const express = require("express");
const router = express.Router();

const {
    homepage,
    currentEmploye,
    employesignup,
     employesignin,
     employesignout,
    //  employesendmail,
    //  employeforgetlink,
    //  employeresetpassword,
    //  employeupdate,
    //  employeavatar,


 } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/",isAuthenticated, homepage)


router.post("/employe",isAuthenticated, currentEmploye)

router.post("/signup", employesignup)

router.post("/signin", employesignin)

router.post("/signout", isAuthenticated,employesignout)


// //get /employe/ send-mail

// router.post("/employe/send-mail", employesendmail)

// //get employe forget link

// router.get("/employe/forget-link/:id", employeforgetlink);

// //post /employe /reset-password/ :employeid link

// router.post("/employe/reset-password/:id", employeresetpassword);


// //post /employe /update/ :employeid link

// router.post("/employe/update/:id", isAuthenticated, employeupdate);



// //post /employe /avatar/ :employeid link

// router.post("/employe/avatar/:id", isAuthenticated, employeavatar);



module.exports = router;