const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT")
const UserController = {
    login: async (req, res) => {
        //req.body
        var result = await UserService.login(req.body);
        if (result.length == 0) {
            res.send({
                code: '-1',
                error: "用户名不匹配",
            })
        }
        else {
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username,
            }, '1d');
            res.header("Authorization", token);
            res.send({
                ActionType: 'OK',
                data:
                {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role,
                }
            })
        }
    }

}

module.exports = UserController;