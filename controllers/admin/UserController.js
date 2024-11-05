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
            res.send({
                ActionType: 'OK',
            })
        }
    }

}

module.exports = UserController;