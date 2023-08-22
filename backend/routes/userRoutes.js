const userRouter = require('express').Router()
const userController = require('../controllers/userController')
var authMiddleware = require("../middlewares/authMiddleware");
var adminMiddleware = require("../middlewares/adminMiddleware");

userRouter.route("/login").post(userController.login);
userRouter.route("/createStudent").post(authMiddleware,adminMiddleware,userController.createStudent);
userRouter.route("/getAllStudent").get(authMiddleware,adminMiddleware,userController.getAllStudent);

module.exports = userRouter;