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
            }, '10s');
            res.header("Authorization", token);
            res.send({
                ActionType: 'OK',
                token: 'kerwin',
            })
        }
    }

}

module.exports = UserController;