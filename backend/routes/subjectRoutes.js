const subjectRoutes = require('express').Router()
const subjectController = require('../controllers/subjectController')
var authMiddleware = require("../middlewares/authMiddleware");
var adminMiddleware = require("../middlewares/adminMiddleware");

subjectRoutes.use(authMiddleware)
subjectRoutes.route("/getAllSubjects").get(subjectController.getAllSubjects);
subjectRoutes.route("/addNewSubject").post(adminMiddleware,subjectController.addNewSubject);

module.exports = subjectRoutes;