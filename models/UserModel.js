const mogoose = require('mongoose');
const Schema = mogoose.Schema;

// user模型==>users集合
const UserType = {
    username: String,
    password: String,
    gender: Number,
    introduction: String,
    avatar: String,
    role: Number,
}
const UserModel = mogoose.model('user', new Schema(UserType));

module.exports = UserModel;