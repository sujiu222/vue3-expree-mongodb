const NewsService = require("../../services/admin/NewsService");

const NewsController = {
  add: async (req, res) => {
    //调用 service 进行添加
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  updataList: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish, _id } = req.body;
    await NewsService.updata({
      _id,
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    console.log(req.body);

    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList({ _id: req.params.id });
    // console.log(result);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  publish: async (req, res) => {
    const { _id, isPublish } = req.body;
    await NewsService.publish({ _id, isPublish, editTime: new Date() });
    res.send({
      ActionType: "OK",
      // data: await NewsService.publish(id,isPublish),
    });
  },
  delete: async (req, res) => {
    await NewsService.delete({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = NewsController;
