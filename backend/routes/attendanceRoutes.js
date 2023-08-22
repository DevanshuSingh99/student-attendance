const attendanceRoutes = require('express').Router()
const attendanceController = require('../controllers/attendanceController')
var authMiddleware = require("../middlewares/authMiddleware");
var adminMiddleware = require("../middlewares/adminMiddleware");

attendanceRoutes.use(authMiddleware)
attendanceRoutes.route("/markAttendance").post(adminMiddleware,attendanceController.markAttendance);

module.exports = attendanceRoutes;