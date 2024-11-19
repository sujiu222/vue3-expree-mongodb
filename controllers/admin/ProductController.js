const ProductService = require("../../services/admin/ProductService");

const ProductController = {
  add: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    data = await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
      data,
    });
  },
  getlist: async (req, res) => {
    const data = await ProductService.getlist({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data,
    });
  },
  delete: async (req, res) => {
    const data = await ProductService.delete({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data,
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail, _id } = req.body;
    const data = ProductService.updateList({
      title,
      introduction,
      detail,
      _id,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
      data,
    });
  },
};

module.exports = ProductController;
