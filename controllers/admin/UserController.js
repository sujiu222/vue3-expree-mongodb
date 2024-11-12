const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
const UserController = {
  login: async (req, res) => {
    //req.body
    var result = await UserService.login(req.body);
    if (result.length == 0) {
      res.send({
        code: "-1",
        error: "用户名不匹配",
      });
    } else {
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          role: result[0].role,
        },
      });
    }
  },
  upload: async (req, res) => {
    // console.log(req.body, req.file);
    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    var payload = JWT.verify(token);
    console.log(payload._id);
    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    res.send({
      ActionType: "OK",
      data: {
        username,
        introduction,
        gender: Number(gender),
        avatar,
      },
    });
  },
  add: async (req, res) => {
    console.log(req.body, req.file);
    const { username, password, role, gender, introduction, file } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    await UserService.add({
      username,
      password,
      role: Number(role),
      introduction,
      gender: Number(gender),
      avatar,
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  delList: async (req, res) => {
    console.log(req.params.id);

    const result = await UserService.delList({
      _id: req.params.id,
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);
    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = UserController;
