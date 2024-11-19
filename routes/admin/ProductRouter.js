var express = require("express");
var ProductRouter = express.Router();
var multer = require("multer");
const upload = multer({ dest: "public/productuploads/" });
const ProductController = require("../../controllers/admin/ProductController");

ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"),
  ProductController.add
);
ProductRouter.get("/adminapi/product/list", ProductController.getlist);
ProductRouter.post(
  "/adminapi/product/list",
  upload.single("file"),
  ProductController.updateList
);
ProductRouter.get("/adminapi/product/list/:id", ProductController.getlist);
ProductRouter.delete("/adminapi/product/delete/:id", ProductController.delete);

module.exports = ProductRouter;
