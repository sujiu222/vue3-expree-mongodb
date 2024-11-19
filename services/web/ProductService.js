const ProductModel = require("../../models/ProductModel");

const ProductService = {
  getList: async ({ _id }) => {
    return _id
      ? ProductModel.find({ _id })
      : ProductModel.find({}).sort({ editTime: -1 });
  },
};
module.exports = ProductService;
