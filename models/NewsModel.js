const mongoose = require("mongoose"); // 修正拼写错误
const Schema = mongoose.Schema;

const NewsType = {
  title: String,
  content: String,
  category: Number,
  cover: String,
  isPublish: Number,
  editTime: Date,
};

const NewsModel = mongoose.model("news", new Schema(NewsType));

module.exports = NewsModel;
