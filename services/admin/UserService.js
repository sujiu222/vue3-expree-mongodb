const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password,
    });
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    return UserModel.updateOne(
      {
        _id,
      },
      {
        username,
        introduction,
        gender,
        avatar,
      }
    );
  },
  add: async ({ username, password, role, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.create({
        username,
        password,
        role,
        introduction,
        gender,
        avatar,
      });
    }
  },
  getList: async ({ id }) => {
    return id
      ? UserModel.find({ _id: id }, [
          "username",
          "password",
          "role",
          "introduction",
          "gender",
        ])
      : UserModel.find({}, [
          "username",
          "role",
          "introduction",
          "gender",
          "avatar",
        ]);
  },
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  putList: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body);
  },
};

module.exports = UserService;
