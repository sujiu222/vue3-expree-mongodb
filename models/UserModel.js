const mongoose = require('mongoose'); // 修正拼写错误
const Schema = mongoose.Schema;

// 定义 User 模型，对应 users 集合
const UserType = {
    username: String,
    password: String,
    gender: Number,
    introduction: String,
    avatar: String,
    role: Number,
};

const UserModel = mongoose.model('user', new Schema(UserType));

module.exports = UserModel;
