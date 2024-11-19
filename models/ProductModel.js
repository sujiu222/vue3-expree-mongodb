const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsType = {
  title: String,
  introduction: String,
  detail: String,
  cover: String,
  editTime: Date,
};

const productModel = mongoose.model("product", new Schema(NewsType));

module.exports = productModel;
