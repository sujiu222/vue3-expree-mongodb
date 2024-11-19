var express = require("express");
var NewsRouter = express.Router();
var multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" });
const NewsController = require("../../controllers/admin/NewsController");

NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"),
  NewsController.add
);
NewsRouter.get("/adminapi/news/list", NewsController.getList);
NewsRouter.post(
  "/adminapi/news/list",
  upload.single("file"),
  NewsController.updataList
);
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList);
NewsRouter.put("/adminapi/news/publish", NewsController.publish);
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delete);

module.exports = NewsRouter;
