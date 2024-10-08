const express = require("express");
const router = express.Router();

const { resume,
      addeducation,
      editeducation,
      deleteeducation,
    } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, resume)


//post
router.post("/add-edu", isAuthenticated, addeducation)


//post
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)


router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)


module.exports = router;