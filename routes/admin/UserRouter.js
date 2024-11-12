var express = require("express");
var UserRouter = express.Router();
const UserController = require("../../controllers/admin/UserController");
//图片上传
const multer = require("multer"); //对文件进行接受上传
const upload = multer({ dest: "public/avataruploads/" });

UserRouter.post("/adminapi/user/login", UserController.login); //对登陆进行接收，然后用UserController.login去验证
UserRouter.post(
  "/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"),
  UserController.add
);

UserRouter.get("/adminapi/user/list", UserController.getList); //对登陆进行接收，然后用UserController.login去验证
UserRouter.get("/adminapi/user/list/:id", UserController.getList);
UserRouter.delete("/adminapi/user/list/:id", UserController.delList);
UserRouter.put("/adminapi/user/list/:id", UserController.putList);
module.exports = UserRouter;
