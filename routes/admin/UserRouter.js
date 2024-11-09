var express = require("express");
var UserRouter = express.Router();
var UserController = require("../../controllers/admin/UserController");


UserRouter.post("/adminapi/user/login", UserController.login)//对登陆进行接收，然后用UserController.login去验证



module.exports = UserRouter;