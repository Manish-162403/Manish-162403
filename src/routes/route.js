const express = require('express');
const router = express.Router();


const collegeModel = require("../models/collegeModel")
const collegeControl  = require("../controller/collegeController")
const internControl  = require("../controller/internController")

router.post("/colleges", collegeControl.createCollege)

router.post("/interns", internControl.createIntern)

router.get("/collegeDetails", collegeControl.collegeDetails)


module.exports = router;