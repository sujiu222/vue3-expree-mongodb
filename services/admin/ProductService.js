const ProductModel = require("../../models/ProductModel");

const ProductService = {
  add: async ({ title, introduction, detail, cover, editTime }) => {
    // console.log("add");
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      editTime,
    });
  },
  getlist: async ({ _id }) => {
    return _id ? ProductModel.find({ _id }) : ProductModel.find({});
  },
  delete: async ({ _id }) => {
    return ProductModel.deleteOne({ _id });
  },
  updateList: async ({ title, introduction, detail, _id, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne(
        { _id },
        { title, introduction, cover, detail, editTime }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        { title, introduction, detail, editTime }
      );
    }
  },
};
module.exports = ProductService;
